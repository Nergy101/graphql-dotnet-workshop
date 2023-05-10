# Use the official .NET 6 SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

# Set the working directory to /app
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.sln .
COPY DotNETGraphQLWorkshop.Api/DotNETGraphQLWorkshop.API.csproj ./DotNETGraphQLWorkshop.Api/
COPY DotNETGraphQLWorkshop.Data/DotNETGraphQLWorkshop.Data.csproj ./DotNETGraphQLWorkshop.Data/
RUN dotnet restore

# Copy the entire project directory
COPY . ./

# Build the project and publish it to /publish
RUN dotnet publish -c Release -o /publish

# Use the official .NET 6 runtime image as the base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Set the working directory to /app
WORKDIR /app
RUN mkdir demodatabase 

# Copy the published files from the previous build stage to this stage
COPY --from=build-env /publish .

# Expose port 80 for the app to listen on
EXPOSE 80
EXPOSE 443

# Set the command to run when the container starts
ENTRYPOINT ["dotnet", "DotNETGraphQLWorkshop.API.dll"]
