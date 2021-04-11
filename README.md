# impl notes

some assumptions:

app is for browser only.
for us zipcodes only.
we want unique zip codes, no duplicates.
we only want the icons of the primary weather condititions in the list so we use the first position in the response.

design notes:

typically zipcode service would be decoupled from localstorage.

The add-location component form has validation, was not in scope but I need it for training, 2 birds one stone. Normally I would debounce the messages a bit on the UI + a better overall experience and more realistic validation.

since the styles are in the template we just use a pipe to resolve the icon url. Note that extreme conditions will not be handled and get a '' url value.

should probably do some cleanup on the weatherPerZip object and type it etc.
