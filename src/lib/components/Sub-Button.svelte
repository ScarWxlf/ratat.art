<script lang='ts'>
      import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
</script>

<button on:click={()=>{
    dispatch('sub')
}} >Sub</button>