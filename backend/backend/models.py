
    
class JobListing(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="job_listings")
    title = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.JSONField(default=list)
    location = models.CharField(max_length=100, blank=True, null=True)
    work_type = models.CharField(max_length=50, choices=[('remote', 'Remote'), ('onsite', 'Onsite'), ('hybrid', 'Hybrid')], default='onsite')
    posted_date = models.DateField(auto_now_add=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.title