<template>
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark py-3 " style="background-color: #1e1e1e;">
            <a class="navbar-brand" href=""> 
                <i class="fab fa-twitter mx-1" style="color: white;"></i>
                Twitter Security 
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">

                    <li class="nav-item">
                        <router-link class="nav-link link" to="/">
                            <span>Home</span>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link link" to="/Dashboard"> 
                            <span>Dashboard</span> 
                        </router-link>
                    </li>

                    
                </ul>
                
            </div>
        </nav>
</template>

<style scoped>
.link span {
    margin-left: 5px;
    position: relative;
}


.link span::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
}

.link span:hover::before {
    visibility: visible;
    transform: scaleX(1);
}

.navbar-brand{
    cursor: default;
}

</style>