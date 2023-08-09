<template>
     <a class="customButton" target="_blank">
        <slot />
      </a>
</template>


<style>
.customButton {
    box-sizing: border-box;
    text-decoration: inherit;
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s;
    border-radius: 20px;
    padding: 0 20px;
    line-height: 38px;
    border-color: hsl(51, 100%, 47%);
    color: #fff !important;
    background-color: hsl(30, 100%, 45%);
}

.customButton:hover {
    /* box-shadow: 0 0 15px rgba(0,0,0,0.2); */
    filter: brightness(0.9);
}

.customButton > * {
    margin: 0.5rem 0;
}
</style>


