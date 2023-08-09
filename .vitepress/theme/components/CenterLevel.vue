<template>
     <div class="centerLevel">
        <slot />
      </div>
</template>


<style>
.centerLevel {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
}
</style>


