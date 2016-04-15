class Api::ResourcesController < Api::BaseController
  before_action :load_resource, only: [:update, :delete]

  def index
    render json: { resources: resource_class.all }
  end

  def create
    if @resource = resource_class.create(resource_params)
      render json: { resource: @resource }
    else
      render json: { errors: 'Error' }, status: :bad_request
    end
  end

  def update
    if @resource.update(resource_params)
      render json: { resource: @resource }
    else
      render json: { errors: 'Error' }, status: :bad_request
    end
  end

  def destroy
    if @resource.destroy
      render json: { resource: @resource }
    else
      render json: { errors: 'Error' }, status: :unprocessable_entity
    end
  end

  private
  def load_resource
    @resource = resource_class.find(params[:id])
  end

  def resource_class
    @resource_class ||= controller_name.singularize.capitalize.constantize
  end

  def resource_params
    params.require(:resource).permit!
  end
end
