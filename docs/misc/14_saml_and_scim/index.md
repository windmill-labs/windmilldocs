# SAML & SCIM

## SAML

### Okta

Configure Okta with the following settings (and replace cf.wimill.xyz with your domain):

![Okta settings](./okta.png)

Pass SAML_METADATA to the container to enable SAML authentication. In the helm charts, the value is `enterprise.samlMetadata`:

![Okta Metadata URL](./okta2.png)

## SCIM

Work in progress
