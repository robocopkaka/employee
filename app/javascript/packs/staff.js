Vue.component('staff-row', {
  template:'#staff-row',
  props:{
  	staff: Object
  },
  data: function(){
  	return {
	  	editMode: false,
	  	errors: {}
	  }
  },
  methods: {
  	// toggle the manager status which also updates the staff in the database
  	toggleManagerStatus: function(){
  		this.staff.manager = !this.staff.manager;
  		this.updateStaff();
  	},
  	updateStaff: function(){
  		var that = this;
  		$.ajax({
  			method: 'PUT',
  			data: {
  				staff: that.staff
  			},
  			url: '/staff/'+ that.staff.id + '.json',
  			success: function(res){
  				that.errors = {};
  				that.staff = res;
  				that.editMode = false;
  			},
  			error: function(res){
  				that.errors = res.responseJSON.errors
  			}
  		})
  	},
  	fireStaff: function(){
  		var that = this;
  		$.ajax({
  			method: 'DELETE',
  			url: '/staff/' + that.staff.id + '.json',
  			success: function(res){
  				that.$remove();
  			}
  		})
  	}
  }
})

var staff = new Vue({
	el: '#staff',
	data: {
		staff: [],
		staff: {
			name:'',
			email: '',
			manager: false
		},
		errors:{}
	},
	ready: function(){
		var that;
		that = this;
		$.ajax({
			url: '/staff.json',
			success: function(res){
				that.staff = res;
			}
		});
	},
	methods: {
		hireStaff: function() {
			var that = this;
			$.ajax({
				method: 'POST',
				data:{
					staff: that.staff
				},
				url: '/staff.json',
				success: function(res){
					that.errors = {}
					that.staff.push(res)
				},
				error: function(res){
					that.errors = res.responseJSON.errors
				}
			})
		}
	}
});