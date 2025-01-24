using FluentValidation;
using LIS.DataContext;
using LIS.WebAPI;
using Microsoft.EntityFrameworkCore;
using AppContext = LIS.DataContext.AppContext;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var connectionString = builder.Configuration.GetConnectionString("AppContext");

builder.Services.AddDbContext<IAppContext, AppContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IValidator<PersonModel>, PersonValidator>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

app.UseHttpsRedirection();
app.UseCors();

app.MapGet("/people/{id:Guid}", async (IAppContext context, Guid id) => await context.People.FindAsync(id))
    .WithName("GetPerson")
    .WithOpenApi();

app.MapGet("/people", async (IAppContext context) => await context.People.ToListAsync())
    .WithName("GetPeople")
    .WithOpenApi();

app.MapPost("/people", async (IValidator<PersonModel> validator, IAppContext context, PersonModel person) =>
    {
        var validationResult = await validator.ValidateAsync(person);

        if (!validationResult.IsValid) return Results.ValidationProblem(validationResult.ToDictionary());

        context.People.Add(person);
        await context.SaveChangesAsync(CancellationToken.None);

        return Results.Created($"/people/{person.Id}", person);
    })
    .WithName("SavePerson")
    .WithOpenApi();

app.Run();

public partial class Program
{
}