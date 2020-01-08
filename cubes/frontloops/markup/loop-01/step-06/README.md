# Markup Loop 01 - Step 06

## Design

![](./design-mockup.png)

## Implementation Challenges

- proper spacing
- element grouping

## What Did I Learn?

### All That Glitters Ain't A Border

The design had a hover effect that was transitioning the `box-shadow`
property. However there was also an apparent border when the element
wasn't being hovered. However, trying to transition from a border state
to a non-border state caused notable 'janck'. To solve this problem I
implemented the 'border' by using the no-offset no-blur box-shadow
technique I learned in a previous step. This resulted in a very pleasant
and clean transition.

## How Could I Improve the UI?
