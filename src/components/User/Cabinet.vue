<template>
    <div>
        Кабинет пользователя
        EMAIL - {{email}}
        ACCESS_TOKEN {{token}}
    </div>
</template>
<script>
export default {
    computed: {
        token () {
            return this.$store.getters.getToken;
        },
        email () {
            return this.$store.getters.getEmail;
        }
    }
}
</script>
