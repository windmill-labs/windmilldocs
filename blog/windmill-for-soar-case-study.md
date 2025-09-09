---
title: Windmill for SOAR - From Code to Security Operations in Minutes
authors: [alexpetric]
tags: ['Case Study', 'SOAR', 'Security Operations', 'Workflow Engine']
slug: windmill-for-soar-case-study
description: How security teams are migrating from rigid SOAR platforms to Windmill for flexible, code-first security automation that scales with complex infrastructures.
---

import DocCard from '@site/src/components/DocCard';

# Windmill for SOAR: From Code to Security Operations in Minutes

When a major organization with 10,000+ employees and a 100-person security operations team migrated from Palo Alto Networks to Windmill for their security orchestration, they weren't just switching tools—they were embracing a fundamentally different approach to SOAR. Instead of rigid, pre-built workflows that couldn't adapt to their complex infrastructure, they found a platform that let them write real code, iterate instantly, and automate their exact security processes.{/* truncate */}

This case study explores how security teams are choosing Windmill for SOAR, with real examples from a live demo presented to FEMA showing automated incident response workflows.

<!-- placeholder: High-level diagram showing IDS → Windmill → Response Actions flow -->
<!-- ![Windmill SOAR Architecture](./windmill_soar_architecture.png "Windmill SOAR Architecture") -->

## Why Organizations Choose Windmill for SOAR

Security teams are increasingly frustrated with traditional SOAR platforms that promise automation but deliver rigidity. Here's why they're migrating to Windmill:

**Speed**: Windmill is up to 10x faster than traditional workflow engines like Airflow, with sub-second job execution and instant workflow transitions built on PostgreSQL and Rust.

**Flexibility**: Write security scripts in any language—Python, TypeScript, Bash, SQL—and use your existing codebase as-is. No proprietary scripting languages or framework lock-in.

**Control**: Self-hosted and open-source means complete ownership of your security automation. No waiting for vendor features or dealing with API limitations.

**Real code, not pseudo-code**: Import your existing security scripts directly. Use any library, any API, any integration your team already relies on.

**Instant iteration**: Test and deploy security workflows in minutes, not weeks. Built-in IDE with AI assistance helps security engineers build automations faster.

## The SOAR Challenge: Why Traditional Platforms Fall Short

Organizations outgrow managed SOAR platforms as their security infrastructure becomes more complex. The pattern is consistent:

- **Rigid workflows** that don't map to unique organizational structures and custom internal systems
- **Waiting for vendor features** when you need integration with proprietary or government-specific systems  
- **Limited to pre-built integrations** while your security stack includes custom tools and APIs
- **Complex pricing models** that scale poorly as automation needs grow

As one security director noted: "Our workflows got very complex because our infrastructure is complex, and we weren't able to map our playbooks anymore in the managed system."

## Real-World SOAR Example: Automated Incident Response

Here's the complete incident response workflow demonstrated in our FEMA presentation, showing how Windmill handles a real security alert from detection through remediation.

<!-- placeholder: Flow diagram showing the three phases: Data Collection (parallel) → Analysis & Classification → Response Actions (conditional branching) -->
<!-- ![SOAR Incident Response Flow](./soar_incident_response_flow.png "Complete SOAR workflow from IDS alert to remediation") -->

### The Trigger: IDS Alert Webhook

An intrusion detection system detects suspicious activity and sends a webhook to Windmill with:
- Username: `jdoe` 
- IP address: `192.168.1.100`
- Hostname: `workstation-015`
- Scenario ID: `IDS-2024-001`
- Timestamp: `2024-01-15T14:30:00Z`

### Phase 1: Data Collection (Parallel Execution)

Windmill immediately launches five parallel enrichment workflows:

**SIEM Query** (`query_siem_logs.py`)
```python
def main(username: str, ip: str, hostname: str) -> dict:
    # Query SIEM for related events
    events = siem_client.query(
        f"username:{username} OR ip:{ip} OR hostname:{hostname}",
        time_range="last_24h"
    )
    
    return {
        "events": events,
        "failed_logins": len([e for e in events if e.type == "login" and not e.success])
    }
```

<!-- placeholder: Screenshot of Windmill script editor showing the SIEM query script with AI autocomplete suggestions -->
<!-- ![Windmill Script Editor](./windmill_script_editor.png "Windmill code editor with AI assistance") -->

**Threat Intelligence** (`threat_intel.py`) 
- Queries external threat feeds for IP reputation
- Returns risk score (0-100) and malicious indicators

**Identity System** (`identity_retrieval.py`)
- Fetches user details: department, role, managed devices
- Critical for determining blast radius and appropriate response

**Virus Scan** (`virus_scan.py`)
- Scans all devices associated with the user
- Returns infection status and detected threats

**Compliance & Audit Logs**
- Checks recent permission changes and access requests
- Identifies potential insider threats or compromised credentials

### Phase 2: Analysis & Classification

**Risk Scoring Algorithm** (`risk_score.py`)
```python
def main(failed_logins: int, threats: List[str], infected: bool, 
         risk_score_ip: int, is_malicious_ip: bool, permissions_ok: bool,
         compliance_risks: List[str], audit_logs: List[dict], department: str):
    
    score = 0
    
    # SIEM analysis
    if failed_logins >= 5:
        score += 20
    
    # Virus scan results  
    if infected:
        score += 40
    if threats:
        score += 10
    
    # Threat intelligence
    if risk_score_ip >= 80:
        score += 30
    elif risk_score_ip >= 50:
        score += 15
    if is_malicious_ip:
        score += 10
    
    # Identity context
    if department.lower() in ["finance", "admin", "security"]:
        score += 10  # Higher risk for privileged departments
    
    # Compliance violations
    if not permissions_ok:
        score += 20
    if compliance_risks:
        score += 10
    
    # Recent suspicious activities
    for entry in audit_logs:
        if entry["action"] in ["request_access", "add_user", "enable_ssh"]:
            score += 10
            break
    
    # Classification
    if score >= 100:
        severity = "critical"
    elif score >= 70:
        severity = "high"
    elif score >= 40:
        severity = "medium"
    else:
        severity = "low"
    
    return {
        "risk_score": score,
        "severity": severity,
        "should_auto_respond": severity in ["high", "critical"]
    }
```

<!-- placeholder: Screenshot of Windmill flow execution page showing the parallel data collection steps completing and feeding into the risk scoring algorithm -->
<!-- ![Risk Scoring Execution](./risk_scoring_execution.png "Live flow execution showing parallel data collection and risk calculation") -->

**AI-Powered Incident Summary** (`summarize_incident.py`)
- Combines all enrichment data into a prompt for ChatGPT/Claude
- Generates human-readable incident summary for analysts
- Creates ticket body with context and recommended actions

**Automatic Ticket Creation**
- Creates ticket in Linear/ServiceNow with AI-generated summary
- Links to live dashboard for real-time investigation

### Phase 3: Response Actions (Conditional Branching)

Based on the calculated risk score, Windmill automatically executes different response workflows:

**Low Severity**: Log incident to SIEM, no further action

**Medium Severity**: 
- Send Slack alert to `#security` channel
- Create monitoring ticket for analyst review

**High Severity**: 
- Interactive approval workflow via Slack
- Security analyst can approve/deny quarantine actions
- Suspended workflow waits for human decision

**Critical Severity**:
- Immediate user account disable
- Automatic device quarantine  
- Emergency Slack notification with dashboard link

<!-- placeholder: Flow diagram showing the four response branches (low/medium/high/critical) with different actions for each severity level -->
<!-- ![SOAR Response Branching](./soar_response_branching.png "Conditional response workflows based on risk severity") -->

<!-- placeholder: Screenshot of Slack showing the interactive approval message with incident details and quarantine options -->
<!-- ![Slack Approval Workflow](./slack_approval_workflow.png "Interactive Slack approval for high-severity incidents") -->

## Technical Architecture: Scripts, Flows, and Apps

### Scripts: Atomic Security Operations

Each script handles one specific security task and can be developed, tested, and deployed independently:

```python
# Example: disable_user.py
def main(username: str, scenario_id: str) -> dict:
    # Disable in Active Directory
    ad_result = ad_client.disable_user(username)
    
    # Revoke AWS IAM permissions
    aws_result = iam_client.attach_policy(username, "DenyAllPolicy")
    
    # Log action
    audit_logger.log(f"User {username} disabled for scenario {scenario_id}")
    
    return {
        "disabled": True,
        "username": username,
        "timestamp": datetime.now().isoformat(),
        "actions": ["ad_disabled", "aws_revoked"]
    }
```

### Flows: Orchestrating Complex Security Processes

The incident response flow orchestrates 15+ scripts with:
- **Parallel execution** for data collection (5 scripts run simultaneously)
- **Sequential decision making** (risk scoring → AI summary → response)
- **Conditional branching** (different actions per severity level)
- **Human-in-the-loop approvals** (Slack integration for analyst decisions)
- **Error handling** (skip failed enrichment, continue workflow)

### Apps: SOC Dashboards Without Frontend Expertise

Windmill's app builder creates real-time security dashboards by connecting to workflow data:

**Incident Overview Panel**
- Live threat summary from AI analysis
- Risk score visualization with contributing factors
- User and device context from identity systems

**Geographic Context Map**
- IP geolocation with threat indicators
- Network topology view for affected systems

**Interactive Controls**
- Manual quarantine actions
- Approval workflows
- Custom investigation tools

**Background Data Refresh**
- Auto-updating threat feeds every 60 seconds
- Live SIEM data integration
- Real-time compliance status

<!-- placeholder: Screenshot of the Windmill app showing the complete SOAR dashboard with threat map, incident summary, timeline, and interactive controls -->
<!-- ![Windmill SOAR Dashboard](./windmill_soar_dashboard.png "Real-time security dashboard with threat map and incident details") -->

<!-- placeholder: Close-up of the map component showing IP geolocation with threat indicators and network context -->
<!-- ![Threat Intelligence Map](./threat_intelligence_map.png "Geographic visualization of IP threats with real-time data") -->

## Key Security Features

**Secrets Management**: Native integration with HashiCorp Vault, AWS KMS, and Azure Key Vault. All API keys and credentials are encrypted and access-logged.

**Comprehensive Audit Trails**: Every script execution, approval decision, and data access is logged with full traceability. Export via OpenTelemetry to your existing SIEM.

**Identity Integration**: SAML/SSO support with group-based permissions. Use your existing Active Directory/Okta for user management.

**Approval Workflows**: Slack-based interactive approvals with custom forms. Security analysts can approve/deny actions directly from mobile devices.

**Granular Access Control**: Folder-based permissions for scripts, resources, and data. Separate development and production environments.

**Compliance Ready**: Built-in audit logging, version control integration, and change management workflows support SOC 2, FedRAMP, and other compliance requirements.

<!-- placeholder: Screenshot showing Windmill's audit log interface with detailed tracking of all security operations, approvals, and data access -->
<!-- ![Audit Trail Visualization](./audit_trail_visualization.png "Comprehensive audit logs with full traceability") -->

## Getting Started with Windmill for SOAR

**Local Development**: Deploy with Docker Compose in minutes for testing and development:
```bash
curl -s https://raw.githubusercontent.com/windmill-labs/windmill/main/docker-compose.yml | docker-compose -f - up
```

**Enterprise Trial**: 30-day free trial with enterprise features including SAML, external secrets management, and dedicated support.

**Migration Path**: Import existing security scripts as-is. Windmill supports Python, TypeScript, Go, PHP, Bash, and SQL without modification.

**Production Deployment**: Self-hosted on your infrastructure with Kubernetes, Docker, or bare metal. Full control over data and compliance.

## Conclusion

Security teams need automation platforms that match the complexity of modern threat landscapes. Windmill provides the flexibility to build exactly the security workflows your organization needs—from simple alert processing to complex incident response orchestrations.

<!-- placeholder: Side-by-side comparison diagram showing traditional SOAR limitations vs Windmill's code-first flexibility -->
<!-- ![Traditional SOAR vs Windmill](./traditional_soar_vs_windmill.png "Comparison: rigid SOAR platforms vs flexible Windmill approach") -->

Join 2,000+ organizations already using Windmill for mission-critical automation, including government agencies, financial institutions, and security-first companies.

**Ready to modernize your security operations?**

<div className="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Try Windmill"
		description="Deploy locally in 2 minutes or start a free enterprise trial"
		href="https://app.windmill.dev"
	/>
	<DocCard
		title="SOAR Documentation"
		description="Complete guide to building security workflows with Windmill"
		href="/docs/core_concepts/webhooks"
	/>
</div>

Join our [Discord community](https://discord.com/invite/V7PM2YHsPB) to connect with other security engineers using Windmill for SOAR, or [schedule a demo](mailto:team@windmill.dev) to see how Windmill can transform your security operations.