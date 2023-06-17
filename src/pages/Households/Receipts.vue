<script setup lang="ts">
import { getMembers } from '../../api/households';
import { getReceipts, addReceipt } from "../../api/receipts"
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref, computed, type Ref } from 'vue';
import NavBar from './NavBar.vue';
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

const friendlyTime = (time: string): string => {
    let formatter = new Intl.DateTimeFormat('en-CA', {
        dateStyle: 'medium', timeZone: 'UTC'
    });
    return formatter.format(new Date(time));
}

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

const totals = computed(() => {
    if (receipts.value) {
        let userTotals = receipts.value.reduce((acc, receipt) => {
            if (!acc[receipt.purchased_by]) {
                acc[receipt.purchased_by] = {
                    total: Number(receipt.amount),
                    user: receipt.purchasedByUser
                }
            } else {
                acc[receipt.purchased_by].total += Number(receipt.amount);
            }
            return acc;
        }, {} as Record<string, {total: number, user: { email: string}}>)
        return Object.keys(userTotals).map(user => ({
            amount: userTotals[user].total.toFixed(2),
            user: userTotals[user].user
        }));
    } else {
        return [];
    }
})
</script>
<template>
    <div style="position: relative;">
        <div class="d-flex justify-space-around flex-column flex-md-row">
            <div v-for="total in totals" class="mb-3 mb-md-0">
                <div class="text-h4">
                    ${{ total.amount }}
                </div>
                <div>
                    {{ total.user.email }}
                </div>
            </div>
        </div>
        <v-list variant="outlined">
            <VListSubheader>
                Receipts
            </VListSubheader>
            <v-list-item v-for="receipt in receipts" :key="receipt.id">
                <VCard>
                    <VCardText>
                        <div class="d-flex justify-space-between align-end">
                            <div>
                                <div class="text-h5">{{ receipt.shop }}</div>
                                <span> {{ friendlyTime(receipt.purchased) }} </span> • <span> {{  receipt.purchasedByUser.email }}</span>
                            </div>
                            <div>
                                <div class="text-h4">${{ receipt.amount}}</div>
                            </div>
                        </div>
                    </VCardText>
                </VCard>
            </v-list-item>
        </v-list>
        <VDialog v-model="dialogOpen" width="400" max-width="96vw">
            <template #activator="{ props }">
                <VBtn class="mt-3 d-block w-100" color="green" v-bind="props"><VIcon icon="mdi-plus"></VIcon> Add Receipt</VBtn>
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
    </div>
    <NavBar />
</template>