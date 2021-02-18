class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]
  # before_action :set_user, only: [:show,:update,:destroy]
# If I wanted to use this controller for my authetication, the create itself would need to be more built out and it needs a before action for any route the user has to be logged in to hit. And destroy
  # def index
  #   users = User.all
  #   render json: users, status: 200
  # end

  def create
    @user = User.create(user_params)
    if @user.valid? 
      my_token = encode_token({user_id: @user.id})
      render json: {id: @user.id, username: @user.username, token: my_token}
    else 
      render json: {error: 'failed to create a user'}
    end 
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  # def update
  #   @user.update(user_params)
  #   render json: @user, status: 200
  # end

  # def destroy
  #   userId = @user.id
  #   @user.destroy
  #   render json: {message:"Zap! user deleted", userId:userId}
  # end

  # def show
  #   render json: @user, status: 200
  # end

 
  # def set_user
  #   @user = User.find(params[:id])
  # end
end
