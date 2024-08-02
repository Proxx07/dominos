<script setup lang="ts">
import type { ICartItem, IProcessedProduct, IProduct } from '~/composables/useShopData/types';

const props = defineProps<{
  product: IProcessedProduct
}>();

const emit = defineEmits<{
  (e: 'addToCart', value: ICartItem): void
}>();

const menuStore = useMenuStore();
const cartStore = useCartStore();

const sizeID = ref<string>('');
const modifierID = ref<string>('');

const defaultSize = computed(() => props.product?.modifiers && props.product.modifiers[0]);
const defaultModifier = computed(() => defaultSize.value?.modifiers && defaultSize.value?.modifiers[0]);
const modifierOption = computed(() => {
  return (sizeID.value && props.product.modifiers) ? props.product.modifiers.filter(modifier => modifier.id === sizeID.value)[0]?.modifiers ?? [] : [];
});

const size = computed<string>({
  get() {
    return sizeID.value;
  },

  set(value: string) {
    sizeID.value = value;
    modifierID.value = modifierOption.value.length ? modifierOption.value[0].id : '';
  },
});

sizeID.value = defaultSize.value?.id ?? '';
modifierID.value = defaultModifier?.value?.id ?? '';

const thisProduct = computed<IProduct>(() => {
  if (modifierID.value) return menuStore.productsForCart.filter(prod => prod.subCategory?.id === modifierID.value)[0];
  if (sizeID.value) return menuStore.productsForCart.filter(prod => prod.subCategory?.id === sizeID.value)[0];
  return menuStore.productsForCart.filter(prod => prod.subCategory?.id === props.product.id)[0];
});

function addToCart(value: IProduct, amount?: number) {
  emit('addToCart', { id: value.id, amount: amount ?? 1 });
}

const cartProdAmount = computed<number>({
  get() {
    return cartStore.cartStorageList.find(prod => thisProduct.value.id === prod.id)?.amount ?? 0;
  },

  set(amount: number) {
    addToCart(thisProduct.value, amount);
  },
});
</script>

<template>
  <div v-if="thisProduct?.id" class="product">
    <div class="product__image">
      <v-image v-if="thisProduct.imageUrl" :src="thisProduct.imageUrl" />

      <chip v-once :label="`от ${thisProduct.price} сум`" class="image-chip" />
    </div>

    <div class="product__name">
      {{ product?.name }}
    </div>

    <div v-if="thisProduct?.description" class="product__description">
      {{ thisProduct?.description }}
    </div>

    <Select
      v-if="product.modifiers?.length && modifierOption.length"
      v-model="size"
      :options="product.modifiers"
      option-label="name"
      option-value="id"
      fluid
    />

    <product-modifiers
      v-else-if="!modifierOption.length && product.modifiers?.length"
      v-model="size"
      :options="product.modifiers"
      option-label="name"
      option-value="id"
    />

    <div class="product__modifiers">
      <product-modifiers
        v-model="modifierID"
        :options="modifierOption"
        option-label="name"
        option-value="id"
      />
    </div>

    <div class="product__bottom">
      <div class="product__price">
        {{ thisProduct?.price }} сум.
      </div>
      <client-only>
        <template #fallback>
          <Skeleton width="11rem" height="3.8rem" />
        </template>
        <Button
          v-if="!cartProdAmount"
          severity="secondary"
          label="В корзину"
          class="buy-button"
          @click="addToCart(thisProduct)"
        />

        <input-number v-else v-model="cartProdAmount" show-buttons :use-grouping="false" button-layout="horizontal" class="amount" :min="0" :max="999">
          <template #decrementbuttonicon>
            <i class="pi pi-minus" />
          </template>

          <template #incrementbuttonicon>
            <i class="pi pi-plus" />
          </template>
        </input-number>
      </client-only>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  padding: 1.6rem;
  background: var(--white);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__image {
    position: relative;
    .image-chip {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  &__name {
    font: var(--font-18-b);
    color: var(--accent-text);
    text-align: center;
  }

  &__modifiers {
    flex-grow: 1;
  }

  &__bottom {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: auto;
  }

  &__price {
    flex-grow: 1;
    font: var(--font-14-b);
  }
}

.buy-button {
  padding-left: 2.3rem;
  padding-right: 2.3rem;
}
</style>
