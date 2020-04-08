from django.db import models
from backendmodel.core.models import BaseTimeStampModel, User
import uuid


class Company(BaseTimeStampModel):
    company_manager = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='owner_company')
    company_name = models.CharField(max_length=255)
    company_address = models.TextField()
    company_code = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.company_name


class CompanyDivision(BaseTimeStampModel):
    company_division = models.ForeignKey(
        Company, null=True, blank=True, related_name='division', on_delete=models.CASCADE)
    division_name = models.CharField(max_length=255)

    def __str__(self):
        return self.division_name


class DivisionMember(BaseTimeStampModel):
    division = models.ForeignKey(
        CompanyDivision, on_delete=models.CASCADE, related_name='company_member_division', null=True, blank=True)
    division_member = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name='member', null=True, blank=True)

    def __str__(self):
        return f'{self.division} || {self.division_member.fullname}'
