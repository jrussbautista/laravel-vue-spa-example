<template>
    <div>
        <Header />
        <main>
            <div class="container mt-3">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
import  Header from './Header';

export  default  {
    components:{
        Header
    }
}
</script>
