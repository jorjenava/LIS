using System.ComponentModel.DataAnnotations;

namespace LIS.DataContext;

public class PersonModel
{
    [MaxLength(36)]
    public Guid Id { get; set; }
    
    public int? Age { get; set; }
    
    [MaxLength(255)]
    public string? Hometown { get; set; }
    
    [MaxLength(255)]
    public required string Name { get; set; }
    
    [MaxLength(255)]
    public required string Title { get; set; }
}