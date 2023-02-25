<script setup lang="ts">
import { ref, type Ref } from "vue"
import { useMutation, useQuery } from '@tanstack/vue-query';
import { getHouseholds, createHousehold } from "../../api/households"

const { data } = useQuery({
    queryKey: ['households'],
    queryFn: () => getHouseholds()
})

const { mutate } = useMutation({
    mutationFn: createHousehold
})

const required = (val: string) => !!val || "Please provide a name for your household"
const name = ref('')
const dialogOpen: Ref<boolean> = ref(false);
const onSubmit = async () => {
    console.log(name.value);
    mutate({name: name.value})
    dialogOpen.value = false;
}

</script>
<template>
    <div>
        Your Households
    </div>
    <VDialog v-model="dialogOpen" width="400" max-width="96vw">
        <template #activator="{ props }">
            <VBtn class="mt-3" color="primary" v-bind="props">New Household</VBtn>
        </template>
        <VForm @submit.prevent="onSubmit()">
            <VCard class="p-5">
                <VCardTitle>
                    Create a household
                </VCardTitle>
                <VCardText>
                    <VAlert color="primary" class="mb-3">
                        First, give your household a name
                    </VAlert>
                    <VTextField :rules=[required] v-model="name" label="Household Name"></VTextField>
                </VCardText>
                <VCardActions>
                    <VLayout >
                        <VBtn type="submit" block color="primary" variant="elevated">Create Household</VBtn>
                    </VLayout>
                </VCardActions>
            </VCard>
        </VForm>
    </VDialog>
    <v-list variant="outlined">
        <VListSubheader>
            Your Households
        </VListSubheader>
        <v-list-item v-for="household in data" :key="household.id" :to="`/households/${household.id}`">
            {{ household.name }}
        </v-list-item>
    </v-list>
</template>