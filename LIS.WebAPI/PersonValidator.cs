using FluentValidation;
using LIS.DataContext;

namespace LIS.WebAPI;

public class PersonValidator : AbstractValidator<PersonModel>
{
    public PersonValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Title).NotEmpty();
    }
}