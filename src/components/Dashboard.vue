<template>
    <div id="dashboard">
        <div class="container searchContainer my-5">
            <div
                class="row text-center align-items-center rounded shadow"
                style="background-color: #1f1f1f"
            >
                <div class="col-sm-2 py-2">
                    <img
                        src="../assets/twitterIcon.png"
                        alt="Twitter Security"
                        class="img-fluid"
                        style="max-width: 100px; height: auto"
                    />
                </div>
                <div class="col-sm-8 py-2">
                    <form class="w-100 searchbar">
                        <div class="input-group" style="">
                            <input
                                type="text"
                                class="form-control"
                                :placeholder="inputText"
                                v-model="query"
                            />
                            <div class="input-group-append">
                                <button
                                    class="btn btn-outline-secondary searchBtn text-white"
                                    type="button"
                                    @click="getTwitterData()"
                                >
                                    {{ searchBtnText }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-sm-2 py-2">
                    <button
                        type="button"
                        class="btn btn-block btn-outline-light"
                        @click="toggleSearchingMethod()"
                    >
                        <span
                            v-bind:class="[
                                searchUser ? 'activeSearch' : 'inactiveSearch',
                            ]"
                        >
                            User
                        </span>
                        /
                        <span
                            v-bind:class="[
                                searchUser ? 'inactiveSearch' : 'activeSearch',
                            ]"
                        >
                            Topic
                        </span>
                    </button>
                </div>
            </div>

            <div class="row mt-5 text-white text-center">
                <div class="col-md-5 rounded px-0">
                    <button
                        class="btn w-100 btn-outline-success"
                        type="button"
                        data-toggle="collapse"
                        data-target="#multiCollapseExample1"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample1"
                    >
                        Secure Tweets
                    </button>

                    <div
                        class="collapse"
                        id="multiCollapseExample1"
                        style="background-color: #1f1f1f"
                    >
                        <div class="tweetContainer1"></div>
                    </div>
                </div>

                <div class="col-md-2">
                    <div class="text-center">
                        <div
                            class="spinner-border spinner"
                            style="display: none;"
                            role="status"
                        >
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>

                <div class="col-md-5 rounded px-0">
                    <button
                        class="btn w-100 btn-outline-danger"
                        type="button"
                        data-toggle="collapse"
                        data-target="#multiCollapseExample2"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample2"
                    >
                        Harmful Tweets
                    </button>

                    <div class="collapse" id="multiCollapseExample2">
                        <div class="tweetContainer2"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container px-0">
            <div
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
            >
                Toggle <strong> Secure Tweets / Harmful Tweets </strong> above only after searching for a user or topic to access corresponding tweets.
                <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import TweetJs from "../assets/js/tweetjs";

require("@tensorflow/tfjs");
const toxicity = require("@tensorflow-models/toxicity");

export default {
    name: "Dashboard",
    data() {
        return {
            query: null,
            searchUser: true,
            inputText: "Enter User",
            data: null,
            searchBtnText: "Search",
            id: "0",
            twttr: null,
        };
    },
    methods: {
        toggleSearchingMethod() {
            this.searchUser = !this.searchUser;
            if (this.searchUser) {
                this.inputText = "Enter User";
            } else {
                this.inputText = "Enter Topic";
            }
                
        },

        mounted() {},

        getTwitterData() {

            let spinner = document.querySelector(".spinner");
                spinner.style.display = "inline-block";

            let twttr = (function (d, s, id) {
                var t,
                    js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
                return (
                    window.twttr ||
                    (t = {
                        _e: [],
                        ready: function (f) {
                            t._e.push(f);
                        },
                    })
                );
            })(document, "script", "twitter-wjs");


            if (this.searchUser) {
                TweetJs.ListTweetsOnUserTimeline(this.query, function (data) {
                    data = data.splice(0, data.length / 2);
                    console.log(data);
                    if (data.errors != undefined) {
                        alert("please enter a valid username");
                    } else {
                        let sentences = [];
                        for (let i = 0; i < data.length; i++) {
                            sentences.push(data[i].text);
                        }

                        const threshold = 0.9;

                        let flaggedTweetIndex = [];

                        toxicity.load(threshold).then((model) => {
                            model.classify(sentences).then((predictions) => {
                                console.log(predictions);
                                for (let i = 0; i < predictions.length; i++) {
                                    for (
                                        let j = 0;
                                        j < predictions[i].results.length;
                                        j++
                                    ) {
                                        if (
                                            predictions[i].results[j].match ==
                                            true
                                        ) {
                                            if (
                                                !flaggedTweetIndex.includes(j)
                                            ) {
                                                flaggedTweetIndex.push(j);
                                            }
                                        }
                                    }
                                }

                                let tweetContainer1 = document.querySelector(
                                    ".tweetContainer1"
                                );
                                let tweetContainer2 = document.querySelector(
                                    ".tweetContainer2"
                                );

                                for (let i = 0; i < data.length; i++) {
                                    let id = data[i].id_str;
                                    let tweet = document.createElement("div");

                                    if (flaggedTweetIndex.includes(i)) {
                                        tweetContainer2.appendChild(tweet);
                                        twttr.widgets.createTweet(id, tweet, {
                                            conversation: "none", // or all
                                            cards: "hidden", // or visible
                                            linkColor: "#cc0000", // default is blue
                                            theme: "light", // or dark
                                        });
                                    } else {
                                        tweetContainer1.appendChild(tweet);
                                        twttr.widgets.createTweet(id, tweet, {
                                            conversation: "none", // or all
                                            cards: "hidden", // or visible
                                            linkColor: "#cc0000", // default is blue
                                            theme: "light", // or dark
                                        });
                                    }
                                }
                                spinner.style.display = "none";
                            });
                        });
                    }
                });
            } else {
                TweetJs.Search(this.query, function (data) {
                    data.statuses = data.statuses.splice(0, data.length / 2);
                    console.log(data.statuses);
                    if (data.statuses.length == 0) {
                        alert("please enter a valid topic");
                    } else {
                        let sentences = [];
                        for (let i = 0; i < data.statuses.length; i++) {
                            sentences.push(data.statuses[i].text);
                        }

                        const threshold = 0.9;

                        let flaggedTweetIndex = [];

                        toxicity.load(threshold).then((model) => {
                            model.classify(sentences).then((predictions) => {
                                console.log(predictions);
                                for (let i = 0; i < predictions.length; i++) {
                                    for (
                                        let j = 0;
                                        j < predictions[i].results.length;
                                        j++
                                    ) {
                                        if (
                                            predictions[i].results[j].match ==
                                            true
                                        ) {
                                            if (
                                                !flaggedTweetIndex.includes(j)
                                            ) {
                                                flaggedTweetIndex.push(j);
                                            }
                                        }
                                    }
                                }

                                let tweetContainer1 = document.querySelector(
                                    ".tweetContainer1"
                                );
                                let tweetContainer2 = document.querySelector(
                                    ".tweetContainer2"
                                );

                                

                                for (let i = 0; i < data.length; i++) {
                                    let id = data[i].id_str;
                                    let tweet = document.createElement("div");

                                    if (flaggedTweetIndex.includes(i)) {
                                        tweetContainer2.appendChild(tweet);
                                        twttr.widgets.createTweet(id, tweet, {
                                            conversation: "none", // or all
                                            cards: "hidden", // or visible
                                            linkColor: "#cc0000", // default is blue
                                            theme: "light", // or dark
                                        });
                                    } else {
                                        tweetContainer1.appendChild(tweet);
                                        twttr.widgets.createTweet(id, tweet, {
                                            conversation: "none", // or all
                                            cards: "hidden", // or visible
                                            linkColor: "#cc0000", // default is blue
                                            theme: "light", // or dark
                                        });
                                    }
                                }

                                spinner.style.display = "none";
                            });
                        });
                    }
                });
            }

            

            
        },
    },
};
</script>



<style scoped>
#dashboard {
    background-color: #121212;
    min-height: 100vh;
}

.activeSearch {
    font-weight: bold;
}

.inactiveSearch {
    font-weight: normal;
}
</style>