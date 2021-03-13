# integer-info
### integer-info is a toy GraphQL project that provides integer information as a service.

Integers can be queried by range or by value and then examined.

## Example:

### Input:

``` GraphQL
{
  range(start: 16, end: 20){
    value
    isPrime
  }
}
```
### Output: 

``` json
{
  "data": {
    "range": [
      {
        "value": 16,
        "isPrime": false
      },
      {
        "value": 17,
        "isPrime": true
      },
      {
        "value": 18,
        "isPrime": false
      },
      {
        "value": 19,
        "isPrime": true
      }
    ]
  }
}
```

# Documentation:

## Queries
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" align="center" valign="middle"><strong>number</strong></td>
<td valign="top"><a href="#integer">Integer</a></td>
<td>
Get information for a single integer.
</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">value</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

The number to examine.

</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" align="center" valign="middle"><strong>range</strong></td>
<td valign="top">[<a href="#integer">Integer</a>]</td>
<td>
Get a range of integers values
</td>
</tr>


</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">start</td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The integer to start at

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">end</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

The integer to end at (non-inclusive)

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">step</td>
<td valign="top"><a href="#int">Int</a></td>
<td>

How much to increment between each number

</td>
</tr>
</tbody>
</table>

## Objects

### Integer

The integer type that can be queried 
for different facts about the integer.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The Numerical value of the integer

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>next</strong></td>
<td valign="top"><a href="#integer">Integer</a></td>
<td>

The i+1 integer

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>previous</strong></td>
<td valign="top"><a href="#integer">Integer</a></td>
<td>

The i-i integer

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>numeral</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The integer expressed as words

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>square</strong></td>
<td valign="top"><a href="#integer">Integer</a></td>
<td>

The square (i*i) of this number

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>squareRoot</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The square root as a float

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>primeFactors</strong></td>
<td valign="top">[<a href="#integer">Integer</a>]</td>
<td>

The prime factors that make up this integer

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isPrime</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Is true if this Integer is prime

</td>
</tr>
</tbody>
</table>
