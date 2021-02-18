class Api::V1::AuthController < ApplicationController
  skip_before_action :authorized, only: [:create]

    def create
        @user = User.find_by(username: params[:username])

        if @user && @user.authenticate(params[:password])
            my_token = encode_token({user_id: @user.id})

            render json: {id: @user.id, username: @user.username, token: my_token}
        else 
            render json: {error: 'That user could not be found'}, status: 401
        end 
    end 

    def show
      render json: {id: @user.id, username: @user.username}
    end

    # def login
    #     user = User.find_by(username: params[:username])
    
    #     if user && user.authenticate(params[:password])
    #       token = encode_token({user_id: user.id})
    #       render json: {user: user, token: token}
    #     else 
    #       render json: {error: "Invalid username or password"}
    #     end
    #   end 
end 