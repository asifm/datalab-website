<script setup lang="ts">
import { useData } from 'vitepress'
// https://vitepress.dev/reference/runtime-api#usedata

import DefaultTheme from "vitepress/theme-without-fonts";

import PageTop from "./components/PageTop.vue";
import "./custom.css";

const { Layout } = DefaultTheme;

const { site, frontmatter } = useData()
</script>

<template>
    <PageTop />
    <Layout />
</template>

<style>
/* .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 800px;
    padding: 2rem 1.5rem;
} */
</style>
