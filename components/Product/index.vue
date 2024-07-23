<script setup lang="ts">
import type {IProcessedProduct, IProduct} from "~/composables/useShopData/types";
const menuStore = useMenuStore();

const props = defineProps<{
  product: IProcessedProduct
}>();

const sizeID = ref<string>("")
const modifierID = ref<string>("")

const size = computed<string>({
  get() {
    return sizeID.value
  },

  set(value: string) {
    sizeID.value = value
    modifierID.value = modifierOption.value[0].id ?? ''
  }
});

const defaultSize = computed(() => props.product?.modifiers && props.product.modifiers[0])
const defaultModifier = computed(() =>  defaultSize.value?.modifiers && defaultSize.value?.modifiers[0])
const modifierOption = computed(() => {
  return (sizeID.value && props.product.modifiers) ? props.product.modifiers.filter(modifier => modifier.id === sizeID.value)[0]?.modifiers ?? [] : [];
})

sizeID.value = defaultSize.value?.id ?? ""
modifierID.value = defaultModifier?.value?.id ?? ""

const thisProduct = computed<IProduct>(() => {
  if (modifierID.value) return menuStore.productsForCart.filter(prod => prod.subCategory?.id === modifierID.value)[0];
  if (modifierID.value) return menuStore.productsForCart.filter(prod => prod.subCategory?.id === sizeID.value)[0];
  return menuStore.productsForCart.filter(prod => prod.subCategory?.id === props.product.id)[0];
});
</script>

<template>
<div>
  {{thisProduct?.name}}
  <hr>
  {{thisProduct?.description}}
  <hr>
  {{thisProduct?.price}}
  <br> <br>
  <div>
    <Select v-model="size" :options="product.modifiers" option-label="name" option-value="id" />
  </div>

  <div>
    <Select v-model="modifierID" :options="modifierOption" option-label="name" option-value="id" />
  </div>
</div>
</template>

<style scoped lang="scss">

</style>
