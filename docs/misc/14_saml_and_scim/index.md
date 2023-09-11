# SAML & SCIM

This guide provides guidance on configuring Okta for both SAML (Security Assertion Markup Language) and SCIM (System for Cross-domain Identity Management).

## SAML

### Okta

Configure Okta with the following settings (and replace cf.wimill.xyz with your domain):

![Okta settings](./okta.png.webp)

Pass SAML_METADATA to the container to enable SAML authentication. In the helm charts, the value is `enterprise.samlMetadata`:

![Okta Metadata URL](./okta2.png.webp)

## SCIM

### Okta

Configure Okta with the following settings (and replace cf.wimill.xyz with your domain):

![Okta SCIM](okta-scim2.png.webp)

![Okta SCIM](okta-scim1.png.webp)

For the Bearer Token, use the value of `enterprise.scimToken` in the helm charts which corresponds to the SCIM_TOKEN env variable for the server container.

![Okta SCIM](okta-scim.png.webp)

Once setup, the groups page should contain a new section:

![New section SCIM](okta-scim-groups.png.webp)
