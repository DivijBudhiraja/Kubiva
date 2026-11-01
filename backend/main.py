from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware
import time
import random
from datetime import datetime, timedelta

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for prototype
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class StartupDataPayload(BaseModel):
    companyName: Optional[str] = None
    industry: Optional[str] = None
    stage: Optional[str] = None
    foundingYear: Optional[str] = None
    city: Optional[str] = None
    # Financials allow loose dict
    financials: Optional[Dict[str, Any]] = None
    growth: Optional[Dict[str, Any]] = None
    funding: Optional[Dict[str, Any]] = None
    team: Optional[Dict[str, Any]] = None
    useOfFunds: Optional[str] = None

class ApplicationPayload(BaseModel):
    formData: Dict[str, Any]
    selectedProduct: Dict[str, Any]
    termsAccepted: bool
    addOns: List[str]

# --- Mock Logic Helpers ---

def calculate_risk_score(industry: str, stage: str, metrics: Dict) -> Dict:
    # Base score
    score = 75
    
    # Adjust based on stage
    if stage and stage.lower() in ['series a', 'series b']:
        score += 10
    elif stage and stage.lower() == 'pre-seed':
        score -= 10
        
    # Adjust based on mock metrics variance (random for prototype)
    variance = random.randint(-5, 5)
    score += variance
    
    # Cap score
    score = max(0, min(100, score))
    
    category = "MODERATE"
    if score >= 80: category = "VERY LOW"
    elif score >= 70: category = "LOW"
    elif score >= 50: category = "MODERATE"
    elif score >= 30: category = "HIGH"
    else: category = "CRITICAL"
    
    factors = [
        "Strong Revenue Growth (+20% MoM)",
        "Low Customer Churn (<2%)",
        "Experienced Team (Avg 5+ years)"
    ]
    if score < 60:
        factors = [
            "High Burn Rate",
            "Short Operating History",
            "Volatile Cash Flow"
        ]
        
    return {
        "score": score,
        "category": category,
        "factors": factors,
        "strengths": ["Market Position", "Tech Stack", "Founder Profile"]
    }

def calculate_debt_capacity(industry: str, input_revenue_annual: float) -> Dict:
    # Simulate extracted vs reported
    extracted_revenue = input_revenue_annual * random.uniform(0.9, 1.1)
    opex = extracted_revenue * 0.7  # Assume 70% opex
    op_profit = extracted_revenue - opex
    
    # DSCR Calculation: Net Operating Income / Debt Service
    # Assuming a notional debt service for calculation
    notional_debt_service = op_profit * 0.5 
    dscr = op_profit / notional_debt_service if notional_debt_service > 0 else 0
    
    # Safe Borrowing Limit: Typically 3-4x monthly revenue or based on EBITDA
    monthly_rev = extracted_revenue / 12
    safe_limit = monthly_rev * 4 
    
    monthly_emi_cap = monthly_rev * 0.25 # Can afford 25% of revenue as EMI
    
    return {
        "annualRevenue": round(extracted_revenue, 2),
        "operatingExpenses": round(opex, 2),
        "operatingProfit": round(op_profit, 2),
        "dscr": round(dscr, 2),
        "safeLimit": round(safe_limit, 2),
        "monthlyEmiCap": round(monthly_emi_cap, 2)
    }

def get_products(industry: str, safe_limit: float, risk_score: int, emi_cap: float):
    products = []
    
    # 1. Fixed EMI Loan
    rate_fixed = 12 if risk_score > 70 else 16
    products.append({
        "id": "fixed_emi",
        "name": "Fixed EMI Loan",
        "amount": f"₹{int(safe_limit/100000)}L",
        "amountValue": safe_limit,
        "rate": f"{rate_fixed}%",
        "type": "Fixed",
        "tenure": "24 months",
        "paymentType": "Fixed Monthly",
        "bestFor": "Stable revenue businesses",
        "features": ["Predictable payments", "No equity dilution", "Build credit history"]
    })
    
    # 2. RBF
    products.append({
        "id": "rbf",
        "name": "Revenue-Based Financing",
        "amount": f"₹{int((safe_limit*0.7)/100000)}L",
        "amountValue": safe_limit * 0.7,
        "rate": "0% Interest",
        "revShare": "5%",
        "type": "Variable",
        "tenure": "Flexible",
        "paymentType": "5% of Monthly Revenue",
        "bestFor": "High growth startups",
        "features": ["Pay as you grow", "No fixed EMI pressure", "No personal guarantee"]
    })
    
    # 3. Seasonal Flex
    products.append({
        "id": "seasonal",
        "name": "Seasonal Flex EMI",
        "amount": f"₹{int(safe_limit/100000)}L",
        "amountValue": safe_limit,
        "rate": f"{rate_fixed + 1}%",
        "type": "Seasonal",
        "tenure": "12 months",
        "paymentType": "Variable (Seasonally Adj.)",
        "bestFor": "Seasonal businesses",
        "features": ["Lower payments in off-season", "Cash flow aligned", "Customizable schedule"]
    })
    
    # 4. Growth Trigger
    products.append({
        "id": "growth_trigger",
        "name": "Growth-Trigger Loan",
        "amount": f"₹{int(safe_limit/100000)}L",
        "amountValue": safe_limit,
        "rate": "Starts 15% -> 10.5%",
        "type": "Decreasing Rate",
        "tenure": "36 months",
        "paymentType": "Fixed (Rate drops)",
        "bestFor": "Aggressive growth",
        "features": ["Rate drops with milestones", "Credit limit increases", "Performance incentives"]
    })
    
    # 5. Inventory (Conditional)
    if industry and industry.lower() in ['d2c', 'marketplace', 'retail', 'ecommerce']:
        inv_val = safe_limit * 0.8 # Mock inventory value logic
        products.append({
            "id": "inventory",
            "name": "Inventory-Backed Financing",
            "amount": f"₹{int(inv_val/100000)}L",
            "amountValue": inv_val,
            "rate": "10%",
            "type": "Secured",
            "tenure": "12 months",
            "paymentType": "Daily Auto-Debit",
            "bestFor": "Inventory heavy biz",
            "features": ["Lowest interest rate", "Daily repayment", "Higher LTV"]
        })
        
    return products

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Kubiva API is running"}

@app.post("/api/startups/analyze-documents")
def analyze_documents(data: Dict[str, Any]):
    # Extract needed fields from generic dict
    industry = data.get('industry', 'saas')
    stage = data.get('stage', 'Seed')
    
    # Mock extracting annual revenue from user inputs or defaults
    # In a real app we'd parse the 'financials' dict
    mrr_str = data.get('mrr', '0')
    try:
        mrr = float(mrr_str) if mrr_str else 10
    except:
        mrr = 10
    annual_revenue = mrr * 12 * 100000 # Assuming Lakhs input
    
    risk_assessment = calculate_risk_score(industry, stage, {})
    debt_analysis = calculate_debt_capacity(industry, annual_revenue)
    
    # Industry Benchmarks Mock
    benchmarks = {
        "revenue": {"your": "₹1.2Cr", "industry": "₹80L", "status": "Best in Class"},
        "burnRate": {"your": "1.5x", "industry": "2x", "status": "Good"},
        "grossMargin": {"your": "65%", "industry": "70%", "status": "Below Avg"}
    }
    
    products = get_products(industry, debt_analysis['safeLimit'], risk_assessment['score'], debt_analysis['monthlyEmiCap'])
    
    return {
        "riskAssessment": risk_assessment,
        "debtCapacity": debt_analysis,
        "benchmarks": benchmarks,
        "products": products
    }

@app.post("/api/startups/create-application")
def create_application(payload: ApplicationPayload):
    # Simulate processing
    time.sleep(1)
    
    # Generate Mock Offer
    app_id = f"APP-{int(time.time())}"
    approved_amount = payload.selectedProduct.get('amount', '₹50L')
    
    first_payment_date = (datetime.now() + timedelta(days=30)).strftime("%d %b %Y")
    
    return {
        "status": "success",
        "applicationId": app_id,
        "approvedAmount": approved_amount,
        "productName": payload.selectedProduct.get('name', 'Loan'),
        "firstPaymentDate": first_payment_date,
        "nextSteps": [
            {"step": "KYC Verification", "time": "24 hours", "status": "Pending"},
            {"step": "Disbursal Approval", "time": "2-3 days", "status": "Locked"},
            {"step": "Funds Credited", "time": "1 day", "status": "Locked"}
        ]
    }
