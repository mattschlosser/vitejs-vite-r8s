<script setup lang="ts">
import { getMembers } from '../../api/households';
import { getReceipts, addReceipt } from "../../api/receipts"
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref, computed, type Ref } from 'vue';
const props = defineProps<{id: number}>()

const client = useQueryClient()

const { data: receipts } = useQuery({
    queryKey: ['receipts', props.id],
    queryFn: () => getReceipts(props.id)
})
const { data: members } = useQuery({
    queryKey: ['members', props.id],
    queryFn: () => getMembers(props.id)
})

const memberList = computed(() => {
    return members.value?.map(member => ({ title: member.email, value: member.id })) || []
})

const { mutate: _addReceipt } = useMutation({
    mutationFn: addReceipt,
    onSuccess: () => {
        client.invalidateQueries({
            queryKey: ['receipts', props.id]
        })
    }
})
const dialogOpen: Ref<boolean> = ref(false)
const amount: Ref<number> = ref(0)
const shop: Ref<string> = ref('')
const purchased: Ref<string> = ref('')
const purchasedBy: Ref<number> = ref(0)

const required = (val: string) => !!val || "This field is rquired"
const onSubmit = () => {
    dialogOpen.value = false;
    _addReceipt({
        household: props.id,
        store: shop.value,
        purchased: purchased.value,
        purchasedBy: purchasedBy.value,
        amount: amount.value
    })
}
</script>
<template>

    <VDialog v-model="dialogOpen" width="400" max-width="96vw">
        <template #activator="{ props }">
            <VBtn class="mt-3 d-block" color="primary" v-bind="props">Add Receipt</VBtn>
        </template>
        <VForm @submit.prevent="onSubmit()">
            <VCard class="p-5">
                <VCardTitle>
                    Add a receipt
                </VCardTitle>
                <VCardText>
                    <VAlert color="primary" class="mb-3">
                        Enter details about the receipt
                    </VAlert>
                    <VTextField :rules=[required] type="text" v-model="shop" label="Store Name" placeholder="No Frills"></VTextField>
                    <VTextField :rules=[required] type="date" v-model="purchased" label="Purchased" placeholder="2022-02-22"></VTextField>
                    <VTextField :rules=[required] type="number" v-model="amount" label="Total" placeholder="$22.22"></VTextField>
                    <VSelect :items="memberList" v-model="purchasedBy" label="Purchased By"/>
                </VCardText>
                <VCardActions>
                    <VLayout >
                        <VBtn type="submit" block color="primary" variant="elevated">Add Receipt</VBtn>
                    </VLayout>
                </VCardActions>
            </VCard>
        </VForm>
    </VDialog>
    <v-list variant="outlined">
        <VListSubheader>
            Receipts
        </VListSubheader>
        <v-list-item v-for="receipt in receipts" :key="receipt.id">
            {{ receipt.purchased }} {{ receipt.amount }}
        </v-list-item>
    </v-list>
</template>