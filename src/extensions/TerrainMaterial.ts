import * as THREE from "three"
import {shaderMaterial} from "@react-three/drei"
import {extend, Object3DNode} from "@react-three/fiber"

const TerrainMaterialUniforms = {
    diffuse: null,
    heightMap: null
};

const vertex = `
// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform mat4 _modelMatrix; uniform mat3 _normalMatrix; uniform mat4 _viewMatrix; 
// attributes

// varys
varying vec2 nodeVary0; varying vec3 nodeVary1; varying vec3 nodeVary2; varying vec4 nodeVary3; varying vec3 nodeVary4; varying vec3 nodeVary5; varying vec3 nodeVary6; 
// vars
vec4 nodeVar0; vec4 nodeVar1; vec3 nodeVar2; vec3 nodeVar3; vec3 nodeVar4; vec4 nodeVar5; vec4 nodeVar6; vec3 nodeVar7; vec3 nodeVar8; 
// codes

// variables
// </node_builder>







#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
nodeVary0 = uv;
	nodeVary2 = position;
	nodeVar0 = ( vec4( nodeVary2, 0.0 ) );
	nodeVar1 = ( _modelMatrix * nodeVar0 );
	nodeVar2 = normalize( nodeVar1.xyz );
	nodeVar3 = nodeVar2;
	nodeVary1 = nodeVar3;
	nodeVary3 = tangent;
	nodeVary5 = normal;
	nodeVar4 = ( _normalMatrix * nodeVary5 );
	nodeVar5 = ( vec4( nodeVar4, 0.0 ) );
	nodeVar6 = ( nodeVar5 * _viewMatrix );
	nodeVar7 = normalize( nodeVar6.xyz );
	nodeVar8 = nodeVar7;
	nodeVary4 = nodeVar8;
	nodeVary6 = normal;
	


	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}



`;

const fragment = `
// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform sampler2D diffuse; uniform sampler2D heightMap; 
// attributes

// varys
varying vec2 nodeVary0; varying vec3 nodeVary1; varying vec3 nodeVary2; varying vec4 nodeVary3; varying vec3 nodeVary4; varying vec3 nodeVary5; varying vec3 nodeVary6; 
// vars
vec4 nodeVar0; vec3 nodeVar1; vec3 nodeVar2; vec3 nodeVar3; vec3 nodeVar4; vec3 nodeVar5; vec3 nodeVar6; vec3 nodeVar7; vec3 nodeVar8; vec4 nodeVar9; vec3 nodeVar10; 
// codes
vec3 customFn_jZF8muD90Iab ( float height ) {
                
    
    bool invertY = false;
    float intensity = float(0.5) * 0.1;
    mat3 TangentMatrix = mat3(nodeVar2,nodeVar7,nodeVar8);
    
    vec3 worldDerivativeX = dFdx(nodeVary1);
    vec3 worldDerivativeY = dFdy(nodeVary1);

    vec3 crossX = cross(TangentMatrix[2].xyz, worldDerivativeX);
    vec3 crossY = cross(worldDerivativeY, TangentMatrix[2].xyz);
    float d = dot(worldDerivativeX, crossY);
    float sgn = d < 0.0 ? (-1.f) : 1.f;
    float surface = sgn / max(0.00000000000001192093f, abs(d));

    float dHdx = dFdx(height);
    float dHdy = dFdy(height);
    vec3 surfGrad = surface * (dHdx*crossY + dHdy*crossX);
    vec3 norm = normalize(TangentMatrix[2].xyz - (intensity * surfGrad));

    norm = norm * TangentMatrix;

    // Invert the green channel if necessary
    if (invertY)
    {
        norm.g = 1.0 - norm.g;
    }

    return norm * 0.5 + 0.5;
    
            }

// variables
// </node_builder>

#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif

#ifdef IOR
	float ior;
#endif

#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif

	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif

#ifdef USE_IRIDESCENCE
	float iridescence;
	float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {



	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 0.0 );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
nodeVar0 = ( texture2D( diffuse, nodeVary0 ) );
	nodeVar1 = ( nodeVar0.xyz * vec3( 1, 1, 1 ) );
	
	diffuseColor = vec4( nodeVar1, 1.0 );

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>

	roughnessFactor = 1.0;

	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
nodeVar2 = normalize(nodeVary3.xyz);
	nodeVar3 = (normalize(nodeVary4));
	nodeVar4 = normalize(nodeVar3);
	nodeVar5 = normalize(nodeVary3.xyz);
	nodeVar6 = normalize(cross(nodeVary6, nodeVary3.xyz));
	nodeVar7 = normalize(nodeVar6);
	nodeVar8 = normalize(nodeVar3);
	nodeVar9 = ( texture2D( heightMap, nodeVary0 ) );
	nodeVar10 = customFn_jZF8muD90Iab( nodeVar9.x );
	
	vec3 mapN = nodeVar10 * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize(vTBN * mapN);

	
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN

		// Sheen energy compensation approximation calculation can be found at the end of
		// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;

	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;

	#endif

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;

export const TerrainMaterial = shaderMaterial(TerrainMaterialUniforms, vertex, fragment);

extend({TerrainMaterial})

declare module "@react-three/fiber" {
    interface ThreeElements {
        terrainMaterial: Object3DNode<typeof TerrainMaterialUniforms, THREE.ShaderMaterial>;
    }
}
