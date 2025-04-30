from sqlalchemy.orm import Session
from app.models.company import Company
from app.api.companies.schemas import CompanyCreate, CompanyUpdate

def get_companies(db: Session):
    return db.query(Company).all()

def get_company(db: Session, company_id: int):
    return db.query(Company).filter(Company.id == company_id).first()

def create_company(db: Session, company: CompanyCreate):
    db_company = Company(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

def update_company(db: Session, company_id: int, company_update: CompanyUpdate):
    db_company = get_company(db, company_id)
    if db_company:
        for key, value in company_update.dict(exclude_unset=True).items():
            setattr(db_company, key, value)
        db.commit()
        db.refresh(db_company)
    return db_company

def delete_company(db: Session, company_id: int):
    db_company = get_company(db, company_id)
    if db_company:
        db.delete(db_company)
        db.commit()
    return db_company