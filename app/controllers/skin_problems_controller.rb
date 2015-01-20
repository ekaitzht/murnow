class SkinProblemsController < ApplicationController
	before_filter :authenticate_user!
  	def create
  		logger.info params.inspect
  		UserSkinProblem.create(user_id: params[:user_id],
  		skin_problem_id: params[:skin_problem_id])
  		respond_with(status: 200)
  	end

  	def destroy 
      @user_problem = UserSkinProblem.find_by(user_id: params[:user_id],
      skin_problem_id: params[:skin_problem_id])
      if !@user_problem.nil?
  		  UserSkinProblem.destroy(@user_problem.id)
        respond_with(status: 200)
      else 
        respond_with(status: 204)    
      end
  	end

    def show
      user_problems = UserSkinProblem.find_by_sql("SELECT a.skin_problem_id,name, skin_problems.id
          FROM  skin_problems
          LEFT JOIN 
              (
                  SELECT  *
                  FROM user_skin_problems
                  WHERE user_id = "+params[:user_id]+"
              ) AS a
          ON skin_problems.id = a.skin_problem_id;")

      response = []

      user_problems.each do |skin_problem|
        if skin_problem[:skin_problem_id].blank?
            response << {state: false , name: skin_problem[:name], id: skin_problem[:id]}
        else 
            response << {state: true , name: skin_problem[:name], id: skin_problem[:id]}
        end
      end
      respond_with response
    end
end



