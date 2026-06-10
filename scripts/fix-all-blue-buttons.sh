#!/bin/bash

# Script to fix all hardcoded blue buttons across the codebase
# This replaces bg-blue-600/700, text-blue-600/700 with semantic primary tokens

cd "$(dirname "$0")/../components" || exit 1

echo "Starting batch refactor of blue buttons..."
echo ""

FILES=(
  "AIAssistantView.tsx"
  "AIEnhancedInsight.tsx"
  "ClientInvoiceDetailView.tsx"
  "ClientInvoicingListView.tsx"
  "CommercialView.tsx"
  "ComplianceView.tsx"
  "CustomerContractDetailView.tsx"
  "CustomerContractListView.tsx"
  "CustomerDetailView.tsx"
  "DocumentHubView.tsx"
  "FinanceView.tsx"
  "FinancialReportsView.tsx"
  "NewCustomerView.tsx"
  "OperationsDashboard.tsx"
  "PackingListDetailView.tsx"
  "PackingListView.tsx"
  "PayablesView.tsx"
  "QuotationDetailView.tsx"
  "QuotationListView.tsx"
  "REXOneSettingsView.tsx"
  "ReceivablesView.tsx"
  "SalesClientsDashboard.tsx"
  "ShipmentDetailView.tsx"
  "ShipmentListView.tsx"
  "ShippingInstructionDetailView.tsx"
  "ShippingInstructionListView.tsx"
  "SystemSettingsView.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    
    # Add cn import if not present
    if ! grep -q "import.*cn.*from.*utils" "$file"; then
      sed -i "0,/^import /s/^import /import { cn } from '..\/lib\/utils';\nimport /" "$file"
    fi
    
    # Replace bg-blue-600 hover:bg-blue-700 patterns
    sed -i "s/bg-blue-600 hover:bg-blue-700/bg-primary hover:opacity-90/g" "$file"
    sed -i "s/bg-blue-600\([^-]\)/bg-primary\1/g" "$file"
    sed -i "s/bg-blue-700/opacity-90/g" "$file"
    
    # Replace text-blue patterns
    sed -i "s/text-blue-600/text-primary/g" "$file"
    sed -i "s/text-blue-700/text-primary/g" "$file"
    sed -i "s/text-blue-400/text-primary/g" "$file"
    
    # Replace border-blue patterns
    sed -i "s/border-blue-500/border-primary/g" "$file"
    sed -i "s/border-blue-600/border-primary/g" "$file"
    
    # Add text-primary-foreground where needed with text-white
    sed -i "s/text-white rounded/text-primary-foreground rounded-md/g" "$file"
    
    echo "  ✓ Done"
  else
    echo "  ✗ File not found: $file"
  fi
done

echo ""
echo "Batch refactoring complete!"
echo "Please review changes and test thoroughly."
echo ""
echo "Commit with: git add components/ && git commit -m 'refactor: Fix all blue button colors to primary tokens'"
