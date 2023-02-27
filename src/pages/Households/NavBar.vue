<script setup lang="ts">
import { useRoute } from 'vue-router';

const {params: {id}} = useRoute()

</script>
<template>
    <VBottomNavigation grow>
        <VBtn :to="`/households/${id}`">
            <VIcon icon="mdi-account-group" />
            Members
        </VBtn>
        <VBtn :to="`/households/${id}/receipts`">
            <VIcon icon="mdi-receipt-text" />
            Receipts
        </VBtn>
    </VBottomNavigation>
</template>