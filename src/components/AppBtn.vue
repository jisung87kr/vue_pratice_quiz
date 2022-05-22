<template>
    <button 
    class="border border-slate-600 px-3 py-1 text-xs cursor-pointer hover:bg-slate-600"
    :class="{'bg-slate-600' : active}"
    >
        <slot></slot>
    </button>
</template>
<script>
export default {
    props: {
        active: Boolean
    }
}
</script>