<template>
    <div id="home">
        <div class="container text-center">
            <p class="main text-white">
                Secure Your
                <a href="https://twitter.com/" target="_blank">Twitter</a>
                Account.
            </p>

            <router-link
                to="/Dashboard"
                class="btn btn-primary btn-lg"
                href="#about"
                role="button"
            >
                Get Started
                <i class="fas fa-lock"></i>
            </router-link>
        </div>

        <br />
        <br />

        <div class="container text-center">
            <a href="#info" class="arrow">
                <i class="fas fa-arrow-down circleIcon"></i>
            </a>
        </div>

        <div class="container text-center info-container" id="info">
            <p class="infoText text-white">Secure you Twitter Account by identifying <span>harmful</span> tweets. </p>
            <div class="row">
                <div class="col-6">
                    <div class="card text-white" style="background-color: #272727;">
                        <div class="card-header text-white" style="font-size: 1.25em">Address Misinformation and Toxicity</div>
                        <div class="card-body">
                           
                            <p class="card-text text-muted">
                                With supporting text below as a natural lead-in
                                to additional content.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card " style="background-color: #272727;">
                        <div class="card-header text-white" style="font-size: 1.25em"> The Project</div>
                        <div class="card-body">
                            <p class="card-text text-muted">
                                With supporting text below as a natural lead-in
                                to additional content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr style="background-color: white;" class="divider" > 
        <p class="m-0 p-2 text-center text-light" style="line-height: 2;"> Theta Hacks 2021 | Sid Nath Ritvik Pandey</p>

        
    </div>
</template>

<style scoped>
#home {
    background-color: #121212;
    /* min-height: 170vh; */
}

.container {
    padding-top: 200px;
}

.main {
    font-size: 3.5em;
    font-weight: 100;
}

.main a {
    transition: 0.25s linear;
    cursor: pointer;
    color: white;
    text-decoration: none;
}

.main a:hover {
    color: #0275d8;
}

.arrow {
    font-size: 1.25em;
    color: white;
}

.circleIcon {
    display: inline-block;
    border-radius: 60px;
    padding: 0.5em 0.6em;
}

.circleIcon:hover,
circleIcon:active {
    background-color: grey;
}

.divider{
    margin-top: 100px;
    margin-bottom: 0;
}

.info-container{
    padding: 0 0 100px 0;
}

.infoText{
    padding: 25px;
    font-size: 1.5em;
}

.infoText span{
    font-weight: bolder;
}
</style>