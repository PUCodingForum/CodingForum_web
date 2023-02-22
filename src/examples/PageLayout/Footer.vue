<template>
  <footer class="py-5 footer">
    <div class="container">
      <div class="row">
        <div class="mx-auto mb-4 text-center col-lg-8">

          <a href="https://onlinejudge.org/" target="_blank" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
            UVa
          </a>
          <a href="https://www.pu.edu.tw/" target="_blank" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
            靜宜大學
          </a>
          <a href="https://cpe.cse.nsysu.edu.tw/index.php" target="_blank"
            class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
            CPE
          </a>

        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer"
};
</script>
<style scoped>
@media (min-width: 1200px) {
  .me-xl-5 {
    margin: 3rem !important;
  }
}

@media (max-width: 1200px) {
  .me-xl-5 {
    margin: 2rem !important;
  }
}
</style>
