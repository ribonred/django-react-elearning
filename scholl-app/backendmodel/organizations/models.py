from django.db import models
from backendmodel.core.models import BaseTimeStampModel, User
import uuid


class CompanyDivision(BaseTimeStampModel):
    division_name = models.CharField(max_length=255)
    division_member = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name='member_division', null=True, blank=True)

    def __str__(self):
        return self.division_name


class Company(BaseTimeStampModel):
    company_manager = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='owner_company')
    company_name = models.CharField(max_length=255)
    company_address = models.TextField()
    company_code = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True)
    company_division = models.ForeignKey(
        CompanyDivision, null=True, blank=True, related_name='division', on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.company_name
