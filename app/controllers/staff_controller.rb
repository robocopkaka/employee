class StaffController < ApplicationController

  def create
  	@staff = Staff.new(staff_params)
  	respond_to do |format|
  	  format.json do
  	  	if @staff.save
  	  		render json: @staff
  	  	else
  	  		render json: {errors: @staff.errors.messages}, status:422
  	  	end
  	  end
  	end
  end

  def update
  	@staff = Staff.find(params[:id])
  	respond_to do |format|
  		format.json do
  			if @staff.update(staff_params)
  				render json: @staff
  			else
  				render json: {errors: @staff.errors.messages}, status: 422
  			end
  		end
  	end
  end

  def index
  	@staff = Staff.all
  	respond_to do |format|
  		format.html
  		format.json{render :json => @staff}
  	end
  end

  def destroy
  	Staff.find(params[:id]).destroy
  	respond_to do |format|
  		format.json{render json: {}, status: :no_content}
  	end
  end

  private
  def staff_params
  	params.require(:staff).permit(:name, :email, :manager)
  end
end
