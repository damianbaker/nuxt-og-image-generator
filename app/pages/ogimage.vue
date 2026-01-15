<script setup lang="ts">
const route = useRoute()

// We initialize the input with the URL query, or a default value
const inputContent = ref((route.query.title as string) || 'My Amazing Nuxt Project')
const idProduct = ref((route.query.idproduct as string) || 5711)
const discountValue = ref((route.query.discountvalue as string) || '20')
const discountCode = ref((route.query.discountcode as string) || 'SAVE20')
const activeTitle = ref(inputContent.value)

// When the button is clicked, we update 'activeTitle'
// This triggers the ogImageUrl to recalculate
function generateNewImage() {
  if (inputContent.value) {
    activeTitle.value = inputContent.value
  }
}

const ogImageUrl = computed(() => {
  return `/api/og?title=${encodeURIComponent(activeTitle.value)}&idproduct=${encodeURIComponent(idProduct.value)}&discountvalue=${encodeURIComponent(discountValue.value)}&discountcode=${encodeURIComponent(discountCode.value)}`
})

// Update the meta tags to the image
useSeoMeta({
  title: activeTitle,
  ogTitle: activeTitle,
  description: 'A dynamically generated social card example.',
  ogImage: ogImageUrl,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
    
    <div style="margin-bottom: 40px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
      <label style="display: block; margin-bottom: 10px; font-weight: bold;">
        Customize Title
      </label>
      
      <div style="display: flex; gap: 10px;">
        <input 
          v-model="inputContent"
          type="text" 
          placeholder="Enter a title..."
          style="flex: 1; padding: 10px; font-size: 16px;"
          @keyup.enter="generateNewImage" 
        />
        <button 
          @click="generateNewImage"
          style="padding: 10px 20px; background: #00dc82; color: white; border: none; cursor: pointer; font-size: 16px; font-weight: bold;"
        >
          Generate
        </button>
      </div>
    </div>

    <h3>Open Graph Image Preview : </h3>
    <img 
      :src="ogImageUrl" 
      alt="Social Preview" 
      style="width: 100%; max-width: 600px; display: block; border: 1px solid #ccc; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 12px;" 
    />
  </div>
</template>