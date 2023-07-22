# SAML & SCIM

## SAML

### Okta

Configure Okta with the following settings (and replace cf.wimill.xyz with your domain):

![Okta settings](./okta.png)

Pass SAML_METADATA to the container to enable SAML authentication. In the helm charts, the value is `enterprise.samlMetadata`:

![Okta Metadata URL](./okta2.png)

## SCIM

### Okta

Configure Okta with the following settings (and replace cf.wimill.xyz with your domain):

![Okta SCIM](okta-scim2.png)

![Okta SCIM](okta-scim1.png)

For the Bearer Token, use the value of `enterprise.scimToken` in the helm charts which corresponds to the SCIM_TOKEN env variable for the server container.

![Okta SCIM](okta-scim.png)
