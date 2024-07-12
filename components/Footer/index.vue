<script setup lang="ts">
import { useNavigation } from '~/composables/useNavigation';
import { paymentSystemsList } from '~/composables/useNavigation/models';
import { copyright } from '~/assets/images';

const { NavigationPages } = useNavigation();
</script>

<template>
  <div class="site-bottom">
    <advantages class="advantages-wrapper" />

    <footer class="footer">
      <div class="container">
        <navigation :folders="[...NavigationPages, ...NavigationPages]" />
      </div>

      <div class="info-part">
        <div class="container">
          <payment-systems :list="paymentSystemsList" />
          <footer-company-info />
        </div>
      </div>

      <div class="copyright-wrapper">
        <div class="container">
          <div class="copyright">
            Разработано:
            <a href="https://deliveryhub.uz/" rel="nofollow" target="_blank">
              <img :src="copyright" alt="Fintech Platforms" width="50">
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.advantages-wrapper {
  border-bottom: 1px solid rgba(226, 226, 226, 1);
}

.info-part {
  border-top: 1px solid rgba(226, 226, 226, 1);
  padding: 1.4rem 0;
  .container {
    display: flex;
    gap: 3rem;
    align-items: center;
  }
}

.copyright-wrapper {
  border-top: 1px solid rgba(226, 226, 226, 1);
  padding: 2.2rem;
  .copyright {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    color: var(--primary-500);
  }
}

.site-bottom {
  background: var(--white);
}
</style>
