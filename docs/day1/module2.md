---
sidebar_position: 2
---

# Responsible AI

**Time:** 9:30 am - 10:45 am

## The Six Pillars of Responsible AI

### 1. Fairness
- **Definition**: AI systems should make decisions without bias and treat all individuals fairly
- **Example**: Loan approval systems that don't discriminate based on protected attributes

```python
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import BinaryLabelDatasetMetric
from aif360.algorithms.preprocessing import Reweighing

# Load dataset
dataset = BinaryLabelDataset(...)

# Check for bias
metric = BinaryLabelDatasetMetric(
    dataset,
    unprivileged_groups=[{'gender': 0}],
    privileged_groups=[{'gender': 1}]
)
print(f"Disparate Impact: {metric.disparate_impact()}")

# Mitigate bias
RW = Reweighing(unprivileged_groups=[{'gender': 0}],
               privileged_groups=[{'gender': 1}])
dataset_transf = RW.fit_transform(dataset)
```

### 2. Accountability
- **Definition**: Clear responsibility for AI system outcomes
- **Example**: Model cards and documentation

### 3. Transparency
- **Definition**: AI systems should be explainable and their decisions understandable

```python
import shap
import numpy as np
from transformers import pipeline

# Load model and tokenizer
model = pipeline('text-classification', return_all_scores=True)

# Explain model predictions
explainer = shap.Explainer(model)
shap_values = explainer(["This model is making unfair decisions"])
shap.plots.text(shap_values[0])
```

### 4. Privacy
- **Definition**: Protecting personal data and ensuring confidentiality
- **Example**: Differential privacy in model training

```python
import torch
import torch.nn as nn
from opacus import PrivacyEngine

# Define model
model = nn.Sequential(
    nn.Linear(100, 50),
    nn.ReLU(),
    nn.Linear(50, 10)
)

# Add differential privacy
privacy_engine = PrivacyEngine()
model, optimizer, train_loader = privacy_engine.make_private(
    module=model,
    optimizer=optimizer,
    data_loader=train_loader,
    noise_multiplier=1.0,
    max_grad_norm=1.0,
)
```

### 5. Security
- **Definition**: Protection against malicious use and attacks
- **Example**: Adversarial training

```python
import torchattacks
from torchvision import models

# Load model
model = models.resnet18(pretrained=True)
model.eval()

# Prepare attack
attack = torchattacks.PGD(model, eps=0.3, alpha=0.01, steps=40)

# Generate adversarial examples
adv_images = attack(images, labels)
```

### 6. Reliability & Safety
- **Definition**: Consistent and safe performance in real-world conditions
- **Example**: Model monitoring and validation

```python
from alibi_detect import AdversarialAE, OutlierVAE

# Initialize outlier detector
od = OutlierVAE(
    threshold=0.05,
    encoder_net=encoder_net,
    decoder_net=decoder_net,
    latent_dim=1024
)

# Detect outliers
preds = od.predict(
    X_test,
    outlier_type='instance',
    return_feature_score=True,
    return_instance_score=True
)
```

## Real-world Examples in Public Services

### 1. Predictive Policing
- **Challenge**: Bias in crime prediction
- **Solution**: Transparent algorithms with human oversight
- **Code Example**: Fairness metrics implementation

### 2. Healthcare Triage Systems
- **Challenge**: Allocating limited medical resources
- **Solution**: Ethical AI guidelines for healthcare
- **Code Example**: Bias detection in healthcare data

### 3. Social Services Allocation
- **Challenge**: Fair distribution of social benefits
- **Solution**: Transparent decision-making processes
- **Code Example**: Explainable AI for decision support

## Ethical Considerations and Potential Risks

### Common Ethical Challenges
1. **Bias and Discrimination**
   - Example: Gender bias in hiring algorithms
   - Mitigation: Regular bias audits

2. **Privacy Concerns**
   - Example: Re-identification risks
   - Mitigation: Data anonymization techniques

3. **Accountability Gaps**
   - Example: Autonomous decision-making
   - Mitigation: Clear governance frameworks

### Risk Assessment Framework

```python
from sklearn.metrics import classification_report
import pandas as pd

def risk_assessment(y_true, y_pred, sensitive_features):
    # Calculate performance metrics
    report = classification_report(y_true, y_pred, output_dict=True)
    
    # Calculate fairness metrics
    results = {
        'accuracy': report['accuracy'],
        'precision': report['weighted avg']['precision'],
        'recall': report['weighted avg']['recall'],
        'f1_score': report['weighted avg']['f1-score'],
    }
    
    # Add fairness metrics
    for group in sensitive_features.unique():
        mask = sensitive_features == group
        group_report = classification_report(
            y_true[mask], 
            y_pred[mask], 
            output_dict=True,
            zero_division=0
        )
        results[f'f1_{group}'] = group_report['weighted avg']['f1-score']
    
    return pd.DataFrame([results])
```

## Hands-on Exercise: AI Fairness Audit

### Objective
Conduct a fairness audit on a sample dataset using AIF360

### Steps
1. Load the dataset
2. Identify protected attributes
3. Calculate fairness metrics
4. Apply bias mitigation techniques
5. Compare results

```python
# Sample code for the exercise
from aif360.datasets import GermanDataset
from aif360.metrics import BinaryLabelDatasetMetric

# Load German Credit Dataset
dataset = GermanDataset()

# Define privileged and unprivileged groups
privileged_groups = [{'age': 1}]  # age > 25
unprivileged_groups = [{'age': 0}]  # age <= 25

# Compute fairness metrics
metric = BinaryLabelDatasetMetric(
    dataset,
    unprivileged_groups=unprivileged_groups,
    privileged_groups=privileged_groups
)

print(f"Statistical Parity Difference: {metric.statistical_parity_difference()}")
print(f"Disparate Impact: {metric.disparate_impact()}")
```

## Resources
- [AI Ethics Guidelines by the European Commission](https://ec.europa.eu/digital-strategy/en/high-level-expert-group-artificial-intelligence)
- [Google's Responsible AI Practices](https://ai.google/responsibility/principles/)
- [Microsoft's Responsible AI Resources](https://www.microsoft.com/ai/responsible-ai)

## Discussion Questions
1. What are the biggest challenges in implementing Responsible AI in public services?
2. How can we balance between innovation and ethical considerations?
3. What governance structures are needed for responsible AI deployment?

## Next Steps
- Explore AI ethics frameworks in more depth
- Practice implementing fairness metrics on different datasets
- Stay updated with evolving AI regulations and standards
