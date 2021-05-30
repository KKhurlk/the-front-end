<template>
	<el-table :data="nowtableData">
		<el-table-column prop="name" label="正在爬取的项目" width="250">
		</el-table-column>
		<el-table-column prop="type" width="200">
		</el-table-column>

		<el-table-column label="状态" prop="status" width="150">
			<template>
				<div class="scaleProgress">
					<el-progress :text-inside="true" :stroke-width="18" :percentage="progressNum"></el-progress>
				</div>
			</template>
		</el-table-column>


		<el-table-column>
			<template slot-scope="scope">
				<el-button size="mini" @click="startProgress()">开始</el-button>
			</template>
		</el-table-column>


		<el-table-column>
			<template slot-scope="scope">
				<el-button size="mini" @click="handleCancel(scope.row.id)">取消</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		name: 'NowWork',
		props: ['msg'],
		data() {
			return {
				message: 0,
				// status:0,
				progressNum: 0,
				startTimer: '',
				endTimer: '',
				nowtableData: []
			}
		},
		props: {
			progressStatus: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		watch: {
			progressStatus(val) {
				if (val) {
					this.endProgress()
				}
			}
		},

		mounted() {
			this.loadNowItem()
		},


		methods: {
			loadNowItem() {
				var _this = this
				this.$axios.get('/nowitem').then(resp => {
					if (resp && resp.data.code === 200) {
						_this.nowtableData = resp.data.data
						this.loadNowItem()
					}
				})
			},
			startProgress() {
				this.message = this.msg
				this.$axios
					.post('/getgithub', this.message)
				this.startTimer = setInterval(() => {
					this.progressNum++
					if (this.progressNum > 99) {
						clearInterval(this.startTimer)
					}
				}, 2000);
			},
			endProgress() {
				clearInterval(this.startTimer)
				this.endTimer = setInterval(() => {
					this.progressNum++
					if (this.progressNum > 99) {
						clearInterval(this.endTimer)
						this.finishProgress()
					}
				}, 10);
			},
			finishProgress() {
				this.$emit('finishProgress', false)
			},
			handleCancel(id) {
				this.$confirm('您是否取消爬取该项目对应数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios
						.post('/cancel', {
							id: id
						}).then(resp => {
							if (resp && resp.data.code === 200) {
								this.loadNowItem()
							}
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					})
				})
			},

			showPercentage(state) {
				return this.myProgress[state]
			}
		}
	}
</script>



<style>
	.scaleProgress {
		transform: scaleY(1);
	}
</style>
