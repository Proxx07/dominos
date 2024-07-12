<script setup lang="ts">
import type { IAdvantage } from './types';
import { advantage_1, advantage_2, advantage_3, advantage_4, advantage_5 } from '@/assets/images';

const advantages: IAdvantage[] = [
  {
    image: advantage_1,
    title: '270 000',
    text: 'Клиентов в месяц',
  },

  {
    image: advantage_2,
    title: '35',
    text: 'Пиццерий в Узбекистане',
  },

  {
    image: advantage_3,
    title: '94',
    text: 'Страны',
  },

  {
    image: advantage_4,
    title: '24/7',
    text: 'Доставляем',
  },

  {
    image: advantage_5,
    title: '11:00-23:00',
    text: 'Время работы пиццерий',
  },
];
</script>

<template>
  <section class="advantages">
    <div class="list container">
      <advantages-item v-for="item in advantages" :key="item.title" :item="item" class="advantage-item" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.list {
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  .advantage-item {
    &:not(:last-child) {
      border-right: 1px solid rgba(226, 226, 226, 1);
    }
  }
}
</style>
