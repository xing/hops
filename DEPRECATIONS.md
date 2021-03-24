# Deprecated APIs

### ~~DEP0001~~

~~`hops-config` is deprecated. Please use `ConfigContext` or the [`withConfig()`](https://github.com/xing/hops#withconfigcomponent) HOC from `hops` instead.~~

### DEP0003

The config property `shouldPrefetchOnServer` is deprecated and will be removed in favor of the property `allowServerSideDataFetching` in the next major release of Hops.

### DEP0004

Deep imports to `hops-react/lib/runtime` are deprecated and should be changed to `hops-react` instead.

### DEP0005

Returning warnings from `hops-doctor`'s `diagnose`-hook is deprecated. Please use the doctor's `pushWarning`- and `pushError`-functions instead.

### DEP0006

Apollo v2 support in Hops has been deprecated and will be removed with Hops v15. To upgrade to Apollo v3, please update your dependencies accordingly:

- replace `react-apollo` with `@apollo/client`
- remove `graphql-tag` from your dependnecies
- update your code according to the [Apollo upgrade guide](https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/)
