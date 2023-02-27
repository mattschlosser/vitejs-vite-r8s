<script setup lang="ts">
import { getHousehold, addMember } from '../../api/households';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref, type Ref } from 'vue';
import NavBar from './NavBar.vue';
const props = defineProps<{id: number}>()

const client = useQueryClient()

const { data } = useQuery({
    queryKey: ['household', props.id],
    queryFn: () => getHousehold(props.id)
})

const email: Ref<string> = ref('')

const { mutate } = useMutation({
    mutationFn: (data: {email: string}) => addMember({
        household: props.id,
        email: data.email
    }),
    onSuccess: () => {
        client.invalidateQueries({
            queryKey: ['household', props.id]
        })
    }
})
const dialogOpen: Ref<boolean> = ref(false)

const required = (val: string) => !!val || "An email address is rquired"
const onSubmit = () => {
    dialogOpen.value = false;
    mutate({email: email.value})
}
</script>
<template>

    {{  data.name }}


    <VDialog v-model="dialogOpen" width="400" max-width="96vw">
        <template #activator="{ props }">
            <VBtn class="mt-3 d-block" color="primary" v-bind="props">Add Member</VBtn>
        </template>
        <VForm @submit.prevent="onSubmit()">
            <VCard class="p-5">
                <VCardTitle>
                    Add a household member
                </VCardTitle>
                <VCardText>
                    <VAlert color="primary" class="mb-3">
                        Enter the email address
                    </VAlert>
                    <VTextField :rules=[required] type="email" v-model="email" label="Email Address"></VTextField>
                </VCardText>
                <VCardActions>
                    <VLayout >
                        <VBtn type="submit" block color="primary" variant="elevated">Add Member</VBtn>
                    </VLayout>
                </VCardActions>
            </VCard>
        </VForm>
    </VDialog>
    <v-list variant="outlined">
        <VListSubheader>
            Members
        </VListSubheader>
        <v-list-item v-for="member in data?.members" :key="member.id">
            {{ member.email }}
        </v-list-item>
    </v-list>
    <NavBar />
</template>