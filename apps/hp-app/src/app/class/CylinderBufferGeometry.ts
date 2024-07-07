
import { Float32BufferAttribute, BufferGeometry, Vector3, Vector2 } from "three";
    
    // CylinderBufferGeometry

    // CylinderBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
    // CylinderBufferGeometry.prototype.constructor = CylinderBufferGeometry;

export class CylinderBufferGeometry extends BufferGeometry {

    override readonly type: string | 'CylinderBufferGeometry';

    // buffers

    private indices: number[] = [];
    private vertices: number[] = [];
    private normals: number[] = [];
    private uvs: number[] = [];

    // helper variables

    private index_ = 0;
    private indexArray: number[][] = [];
    private halfHeight = 0;
    private groupStart = 0;
    private parameters: any

    // scope
    scope: CylinderBufferGeometry | undefined

    // constructor
    private radiusTop: number = 1
    private radiusBottom: number = 1
    private height: number = 1
    private radialSegments: number = 8
    private heightSegments: number = 1
    private openEnded: boolean = false
    private thetaStart: number = 0.0
    private thetaLength: number = Math.PI * 2

    constructor(
        radiusTop?: number, 
        radiusBottom?: number, 
        height?: number, 
        radialSegments?: number, 
        heightSegments?: number, 
        openEnded?: boolean, 
        thetaStart?: number, 
        thetaLength?: number
    ) {

        // BufferGeometry.call( this );
        super()

        this.type = "CylinderBufferGeometry"
        this.parameters = {
            radiusTop: radiusTop,
            radiusBottom: radiusBottom,
            height: height,
            radialSegments: radialSegments,
            heightSegments: heightSegments,
            openEnded: openEnded,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };

        this.scope = this;

        this.radiusTop = radiusTop !== undefined ? radiusTop : 1;
        this.radiusBottom = radiusBottom !== undefined ? radiusBottom : 1;
        this.height = height || 1;

        this.radialSegments = Math.floor( radialSegments  || 8) || 8;
        this.heightSegments = Math.floor( heightSegments || 1 ) || 1;

        this.openEnded = openEnded !== undefined ? openEnded : false;
        this.thetaStart = thetaStart !== undefined ? thetaStart : 0.0;
        this.thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

        this.halfHeight = this.height / 2;

        // generate geometry

        this.generateTorso();

        if ( this.openEnded === false ) {

            if ( this.radiusTop > 0 ) this.generateCap( true );
            if ( this.radiusBottom > 0 ) this.generateCap( false );

        }

        // build geometry

        super.setIndex( this.indices );
        super.setAttribute( 'position', new Float32BufferAttribute( this.vertices, 3 ) );
        super.setAttribute( 'normal', new Float32BufferAttribute( this.normals, 3 ) );
        super.setAttribute( 'uv', new Float32BufferAttribute( this.uvs, 2 ) );
    }

    generateTorso() {

        var x, y;
        var normal = new Vector3();
        var vertex = new Vector3();

        var groupCount = 0;

        // this will be used to calculate the normal
        var slope = ( this.radiusBottom - this.radiusTop ) / this.height;

        // generate vertices, normals and uvs

        for ( y = 0; y <= this.heightSegments; y ++ ) {

            var indexRow = [];

            var v = y / this.heightSegments;

            // calculate the radius of the current row

            var radius = v * ( this.radiusBottom - this.radiusTop ) + this.radiusTop;

            for ( x = 0; x <= this.radialSegments; x ++ ) {

                var u = x / this.radialSegments;

                var theta = u * this.thetaLength + this.thetaStart;

                var sinTheta = Math.sin( theta );
                var cosTheta = Math.cos( theta );

                // vertex

                vertex.x = radius * sinTheta;
                vertex.y = - v * this.height + this.halfHeight;
                vertex.z = radius * cosTheta;
                this.vertices.push( vertex.x, vertex.y, vertex.z );

                // normal

                normal.set( sinTheta, slope, cosTheta ).normalize();
                this.normals.push( normal.x, normal.y, normal.z );

                // uv

                this.uvs.push( u, 1 - v );

                // save index_ of vertex in respective row

                indexRow.push( this.index_ ++ );

            }

            // now save vertices of the row in our index_ array

            this.indexArray.push( indexRow );

        }

        // generate indices

        for ( x = 0; x < this.radialSegments; x ++ ) {

            for ( y = 0; y < this.heightSegments; y ++ ) {

                // we use the index_ array to access the correct indices

                var a = this.indexArray[ y ][ x ];
                var b = this.indexArray[ y + 1 ][ x ];
                var c = this.indexArray[ y + 1 ][ x + 1 ];
                var d = this.indexArray[ y ][ x + 1 ];

                // faces

                this.indices.push( a, b, d );
                this.indices.push( b, c, d );

                // update group counter

                groupCount += 6;

            }

        }

        // add a group to the geometry. this will ensure multi material support

        this.scope!.addGroup( this.groupStart, groupCount, 0 );

        // calculate new start value for groups

        this.groupStart += groupCount;

    }

    generateCap( top: boolean ) {

        var x=0, centerIndexStart=0, centerIndexEnd=0;

        var uv = new Vector2();
        var vertex = new Vector3();

        var groupCount = 0;

        var radius = ( top === true ) ? this.radiusTop : this.radiusBottom;
        var sign = ( top === true ) ? 1 : - 1;

        // save the index_ of the first center vertex
        centerIndexStart = this.index_;

        // first we generate the center vertex data of the cap.
        // because the geometry needs one set of uvs per face,
        // we must generate a center vertex per face/segment

        for ( x = 1; x <= this.radialSegments; x ++ ) {

            // vertex

            this.vertices.push( 0, this.halfHeight * sign, 0 );

            // normal

            this.normals.push( 0, sign, 0 );

            // uv

            this.uvs.push( 0.5, 0.5 );

            // increase index_

            this.index_ ++;

        }

        // save the index_ of the last center vertex

        centerIndexEnd = this.index_;

        // now we generate the surrounding vertices, normals and uvs

        for ( x = 0; x <= this.radialSegments; x ++ ) {

            var u = x / this.radialSegments;
            var theta = u * this.thetaLength + this.thetaStart;

            var cosTheta = Math.cos( theta );
            var sinTheta = Math.sin( theta );

            // vertex

            vertex.x = radius * sinTheta;
            vertex.y = this.halfHeight * sign;
            vertex.z = radius * cosTheta;
            this.vertices.push( vertex.x, vertex.y, vertex.z );

            // normal

            this.normals.push( 0, sign, 0 );

            // uv

            uv.x = ( cosTheta * 0.5 ) + 0.5;
            uv.y = ( sinTheta * 0.5 * sign ) + 0.5;
            this.uvs.push( uv.x, uv.y );

            // increase index_

            this.index_ ++;

        }

        // generate indices

        for ( x = 0; x < this.radialSegments; x ++ ) {

            var c = centerIndexStart + x;
            var i = centerIndexEnd + x;

            if ( top === true ) {

                // face top

                this.indices.push( i, i + 1, c );

            } else {

                // face bottom

                this.indices.push( i + 1, i, c );

            }

            groupCount += 3;

        }

        // add a group to the geometry. this will ensure multi material support

        this.scope!.addGroup( this.groupStart, groupCount, top === true ? 1 : 2 );

        // calculate new start value for groups

        this.groupStart += groupCount;

    }

}

