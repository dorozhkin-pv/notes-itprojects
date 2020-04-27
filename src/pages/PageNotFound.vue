<template>
    <div class="col-full"
         :class="$style.centered"
    >
        <h1>Not Found</h1>
        <p>
            Ooops, we couldn't find what you are looking for. Why don't you
            <router-link :to="{name: 'Home'}">
                go home instead?
            </router-link>
        </p>
    </div>
</template>

<script>
  export default {
  }
</script>

<style module>
    .centered {
        text-align: center;
    }
</style>