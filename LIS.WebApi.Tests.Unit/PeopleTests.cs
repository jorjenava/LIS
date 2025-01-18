using System.Net.Http.Json;
using Bogus;
using LIS.DataContext;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using AppContext = LIS.DataContext.AppContext;

namespace LIS.WebApi.Tests.Unit;

public class PeopleTests : IAsyncDisposable
{
    private readonly SqliteConnection _connection;
    private readonly HttpClient _appClient;
    private readonly WebApplicationFactory<Program> _appFactory;
    private readonly AppContext _testContext;
    
    private readonly Faker<PersonModel> _personFaker;

    public PeopleTests()
    {
        _connection = new SqliteConnection("Data Source=TestsDB;Mode=Memory;Cache=Shared");
        _connection.Open();
        
        var contextOptions = new DbContextOptionsBuilder<AppContext>().UseSqlite(_connection).Options;
        _testContext = new AppContext(contextOptions);
        _testContext.Database.EnsureCreated();
        
        _appFactory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => builder
            .ConfigureServices(services =>
            {
                services.AddScoped<DbContextOptions<AppContext>>(_ => contextOptions);
            }));
        
        _appClient = _appFactory.CreateClient();
        
        _personFaker = new Faker<PersonModel>()
            .Rules((f, o) =>
            {
                o.Id = f.Random.Guid();
                o.Age = f.Random.Int(0, 99);
                o.Hometown = f.Address.City();
                o.Name = f.Name.FullName();
                o.Title = f.Name.Prefix();
            });
    }

    public async ValueTask DisposeAsync()
    {
        await _connection.CloseAsync();
        _connection.Dispose();
        await _testContext.DisposeAsync();
        _appClient.Dispose();
        await _appFactory.DisposeAsync();
    }

    [Fact]
    public async Task GivenPersonModel_WhenSavePerson_ThenPersonIsSaved()
    {
        var givenPerson = _personFaker.Generate();

        await _appClient.PostAsJsonAsync("people", givenPerson);

        var actualPerson = await _testContext.People.FirstOrDefaultAsync(x => x.Name == givenPerson.Name);
        
        Assert.NotNull(actualPerson);
        Assert.Equal(givenPerson.Age, actualPerson.Age);
        Assert.Equal(givenPerson.Hometown, actualPerson.Hometown);
        Assert.Equal(givenPerson.Name, actualPerson.Name);
        Assert.Equal(givenPerson.Title, actualPerson.Title);
    }

    [Fact]
    public async Task GivenPersonExists_WhenGetPerson_ThenCorrectPersonIsReturned()
    {
        var givenPerson = _personFaker.Generate();

        _testContext.People.Add(givenPerson);
        
        await _testContext.SaveChangesAsync();

        var actualPerson = await _appClient.GetFromJsonAsync<PersonModel>($"people/{givenPerson.Id}");
        
        Assert.Equivalent(givenPerson, actualPerson);
    }

    [Fact]
    public async Task GivenPeopleExists_WhenGetPeople_ThenAllPeopleAreReturned()
    {
        await _testContext.People.ExecuteDeleteAsync();

        var givenPeople = Enumerable.Range(1, 100)
            .Select(_ => _personFaker.Generate()).ToList();
        
        _testContext.People.AddRange(givenPeople);
        await _testContext.SaveChangesAsync();
        
        var actualPeople = await _appClient.GetFromJsonAsync<List<PersonModel>>("people");
        
        Assert.NotNull(actualPeople);
        Assert.Equivalent(givenPeople, actualPeople); ;
    }
}