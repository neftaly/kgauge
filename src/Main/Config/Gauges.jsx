import { pure } from 'recompose';
import { fromJS } from 'immutable';
import R from 'ramda';

const Gauges = pure(
  ({ gauges }) => <div>
    <h3 children='Gauges' />
    <button
      onClick={
        event => gauges.push(fromJS({ path: [] }))
      }
      children='Add'
    />
    <div children={
      gauges.map(
        (value, key) => <div style={{ marginTop: '1em' }} key={'x-' + key}>
          <div>
            <div
              style={{
                minWidth: '12em',
                marginRight: '1em',
                display: 'inline-block'
              }}
              children='Path:'
            />
            <input
              style={{ width: '20em' }}
              value={
                value.get(
                  'path'
                ).map(
                  R.defaultTo('')
                ).join(
                  '.'
                )
              }
              onChange={
                R.compose(
                  path => value.set('path', path),
                  R.map(
                    R.when(
                      R.isEmpty,
                      R.always(undefined)
                    )
                  ),
                  R.split('.'),
                  R.path(['target', 'value'])
                )
              }
            />
          </div>
          <div>
            <div
              style={{
                minWidth: '12em',
                marginRight: '1em',
                display: 'inline-block'
              }}
              children='Input unit:'
            />
            <input
              placeholder='Default'
              value={value.get('unit', '')}
              onChange={
                R.compose(
                  unit => value.set('unit', unit),
                  R.when(
                    R.isEmpty,
                    R.always(undefined)
                  ),
                  R.path(['target', 'value'])
                )
              }
            />
          </div>
          <div>
            <div
              style={{
                minWidth: '12em',
                marginRight: '1em',
                display: 'inline-block'
              }}
              children='Output unit:'
            />
            <input
              placeholder='Default'
              value={value.get('units', '')}
              onChange={
                R.compose(
                  units => value.set('units', units),
                  R.when(
                    R.isEmpty,
                    R.always(undefined)
                  ),
                  R.path(['target', 'value'])
                )
              }
            />
          </div>
          <div>
            <div
              style={{
                minWidth: '12em',
                marginRight: '1em',
                display: 'inline-block'
              }}
              children='X/Y:'
            />
            <input
              type='number'
              min='0'
              max='10'
              step='1'
              style={{ width: '3em' }}
              value={value.get('x', 0)}
              onChange={event => value.set('x', event.target.value)}
            />
            <input
              type='number'
              min='0'
              max='10'
              step='1'
              style={{ width: '3em' }}
              value={value.get('y', 0)}
              onChange={event => value.set('y', event.target.value)}
            />
          </div>
          <div>
            <div
              style={{
                minWidth: '12em',
                marginRight: '1em',
                display: 'inline-block'
              }}
              children='width/height:'
            />
            <input
              type='number'
              min='0'
              max='10'
              step='1'
              style={{ width: '3em' }}
              value={value.get('width', 1)}
              onChange={event => value.set('width', event.target.value)}
            />
            <input
              type='number'
              min='0'
              max='10'
              step='1'
              style={{ width: '3em' }}
              value={value.get('height', 1)}
              onChange={event => value.set('height', event.target.value)}
            />
          </div>

          <button
            onClick={
              event => confirm('Really delete?') && gauges.delete(key)
            }
            children='Delete'
          />
        </div>
      ).toList().reverse()
    } />
  </div>
);

export default Gauges;
