# TITLE

## Design
![Markup Loop 1 Step 3 Design](./design-mockup.png)

## Implementation Challenges
- sizing and positioning the background image
- getting the outer edge of an element to have *glow effect*

## What Did I Learn?

### Using `background-size` and `background-position`
The design required using a background image. To get this image, which
is far larger then its container, to display I needed to **explicitly
set a height on the container and size the background accounting for the
padding of the container**. Also I needed to position the background
image towards the bottom of this container as well.

### Setting a `box-shadow` with no offsets or blur

To accomplish the hover effect on the account icon, I used `box-shadow:
0 0 0 5px var(--border-color);` which creates a box shadow with no
offsets no blur but a 5px spread basically from the center of the
element.
## How Could I Improve the UI?
