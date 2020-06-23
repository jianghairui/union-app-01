<script>
	export default {
		
		onLaunch: function() {
			uni.$on('page-popup', (data) => {
			    // console.log('标题：' + data.title)
			    // console.log('内容：' + data.content)
			})
			console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
		
	} 
</script>
<style>
	/*每个页面公共css */
</style>
